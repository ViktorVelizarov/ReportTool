package com.example.reportservice.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.openremote.HttpStatusException;
import com.example.reportservice.support.FakeManager;
import java.io.IOException;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ModelClientTest {

    private static final String CALL = "GET /model/assetInfos";

    private FakeManager manager;
    private ModelClient model;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager().respond(CALL, FakeManager.ASSET_INFOS);
        model = new ModelClient(manager.client());
    }

    @AfterEach
    void tearDown() {
        manager.close();
    }

    @Test
    void readsTheAssetTypesWithTheirAttributes() throws Exception {
        List<AssetTypeInfo> infos = model.assetInfos();

        assertEquals(2, infos.size());
        AssetTypeInfo room = infos.get(0);
        assertEquals(new AssetDescriptor("asset", "RoomAsset", "door", "3d85c6"), room.assetDescriptor());
        assertEquals(List.of(
                new AttributeDescriptor("temperature", "number", List.of("celsius")),
                new AttributeDescriptor("notes", "text", null)),
                room.attributeDescriptors());

        AssetTypeInfo agent = infos.get(1);
        assertEquals("agent", agent.assetDescriptor().descriptorType());
        assertEquals("SimulatorAgent", agent.assetDescriptor().name());
        assertNull(agent.assetDescriptor().icon());
        assertNull(agent.assetDescriptor().colour());
        assertTrue(agent.attributeDescriptors().isEmpty());
    }

    @Test
    void readsTheModelInTheRealmOfTheServiceUser() throws Exception {
        model.assetInfos();

        assertEquals("master", manager.lastRealm(CALL));
    }

    @Test
    void passesOnErrorsFromTheManager() {
        manager.failOnce(CALL, 503);

        HttpStatusException e = assertThrows(HttpStatusException.class, () -> model.assetInfos());
        assertEquals(503, e.status());
    }

    @Test
    void reportsUnexpectedResponsesAsIoErrors() {
        manager.respond(CALL, "{}");
        assertThrows(IOException.class, () -> model.assetInfos());

        manager.respond(CALL, "");
        assertThrows(IOException.class, () -> model.assetInfos());
    }
}
