package com.example.reportservice.support;

import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** What a test can read in a PDF of the browser without a PDF library: its pages and its title are not compressed. */
public final class Pdfs {

    private static final Pattern PAGES = Pattern.compile("/Type /Pages\\s*/Count (\\d+)");
    private static final Pattern TITLE = Pattern.compile("/Title \\(([^)]*)\\)");

    private Pdfs() { }

    public static boolean isPdf(byte[] bytes) {
        return text(bytes).startsWith("%PDF-") && text(bytes).stripTrailing().endsWith("%%EOF");
    }

    public static int pageCount(byte[] pdf) {
        Matcher pages = PAGES.matcher(text(pdf));
        if (!pages.find()) {
            throw new AssertionError("no pages in the PDF");
        }
        return Integer.parseInt(pages.group(1));
    }

    /** The title of the document, which the browser takes from the page; null if it has none that is plain text. */
    public static String title(byte[] pdf) {
        Matcher title = TITLE.matcher(text(pdf));
        return title.find() ? title.group(1) : null;
    }

    private static String text(byte[] pdf) {
        return new String(pdf, StandardCharsets.ISO_8859_1);
    }
}
