package com.example.reportservice.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.FakeModel;
import java.util.List;
import org.junit.jupiter.api.Test;

class TextAnswerTest {

    private static String refusal(String content, int descriptions) {
        return assertThrows(IllegalArgumentException.class, () -> TextAnswer.parse(content, descriptions))
                .getMessage();
    }

    @Test
    void readsTheFourKindsOfText() {
        TextAnswer answer = TextAnswer.parse("""
                {"introduction":" About the rooms. ","findings":"Warm.","descriptions":["One.","Two."],
                 "conclusion":"Fine.\\n"}""", 2);

        assertEquals("About the rooms.", answer.introduction(), "without the spaces around it");
        assertEquals("Warm.", answer.findings());
        assertEquals(List.of("One.", "Two."), answer.descriptions());
        assertEquals("Fine.", answer.conclusion());
    }

    @Test
    void aReportWithoutWidgetsHasNoDescriptions() {
        assertEquals(List.of(), TextAnswer.parse(FakeModel.text(0), 0).descriptions());
    }

    @Test
    void refusesWhatIsNotAJsonObject() {
        assertEquals("it is not JSON", refusal("Here is your text: {", 1));
        assertEquals("it is not a JSON object", refusal("", 1));
        assertEquals("it is not a JSON object", refusal("[\"text\"]", 1));
        assertEquals("it is not a JSON object", refusal("\"text\"", 1));
    }

    @Test
    void refusesAnAnswerWithoutExactlyTheFourKinds() {
        String missing = "{\"introduction\":\"a\",\"findings\":\"b\",\"descriptions\":[]}";
        String extra = "{\"introduction\":\"a\",\"findings\":\"b\",\"descriptions\":[],\"conclusion\":\"c\","
                + "\"secret remark\":\"d\"}";
        String renamed = "{\"summary\":\"a\",\"findings\":\"b\",\"descriptions\":[],\"conclusion\":\"c\"}";

        for (String content : List.of(missing, extra, renamed)) {
            String message = refusal(content, 0);

            assertTrue(message.contains("does not have exactly"), content);
            assertFalse(message.contains("secret remark"), "what the model wrote stays out of the message");
        }
    }

    @Test
    void refusesAnotherNumberOfDescriptionsThanWasAskedFor() {
        assertEquals("it has 3 descriptions, and 2 were asked for", refusal(FakeModel.text(3), 2));
        assertEquals("it has 0 descriptions, and 1 were asked for", refusal(FakeModel.text(0), 1));
        assertEquals("it has no list of descriptions, and 1 were asked for", refusal(
                "{\"introduction\":\"a\",\"findings\":\"b\",\"descriptions\":\"One.\",\"conclusion\":\"c\"}", 1));
    }

    @Test
    void refusesATextThatIsEmptyOrNotAText() {
        String template = "{\"introduction\":%s,\"findings\":%s,\"descriptions\":[%s],\"conclusion\":%s}";
        for (String bad : List.of("\"\"", "\" \\n\"", "null", "12", "{\"text\":\"a\"}")) {
            assertEquals("it has no text for the introduction",
                    refusal(template.formatted(bad, "\"b\"", "\"c\"", "\"d\""), 1), bad);
            assertEquals("it has no text for the findings",
                    refusal(template.formatted("\"a\"", bad, "\"c\"", "\"d\""), 1), bad);
            assertEquals("it has no text for a description",
                    refusal(template.formatted("\"a\"", "\"b\"", bad, "\"d\""), 1), bad);
            assertEquals("it has no text for the conclusion",
                    refusal(template.formatted("\"a\"", "\"b\"", "\"c\"", bad), 1), bad);
        }
    }
}
