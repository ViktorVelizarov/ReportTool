package com.example.reportservice.branding;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.MissingNode;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * How the manager shows a realm: the primary colour and the logo that the realm has in the manager's configuration
 * ({@code manager_config.json}).
 *
 * @param primaryColour the primary colour as {@code #rgb} or {@code #rrggbb}; left out of the JSON if the realm sets
 *                      none, or sets it in another notation
 * @param logo          the address of the logo, which the browser can load; left out of the JSON if the realm has none
 */
record Branding(
        @JsonInclude(JsonInclude.Include.NON_NULL) String primaryColour,
        @JsonInclude(JsonInclude.Include.NON_NULL) String logo) {

    /** The primary colour is the manager's {@code --or-app-color4}, set in the {@code styles} of the realm. */
    private static final Pattern PRIMARY_COLOUR =
            Pattern.compile("--or-app-color4\\s*:\\s*(#(?:[0-9a-fA-F]{3}){1,2})(?![0-9a-zA-Z])");
    private static final Pattern ABSOLUTE_URL = Pattern.compile("https?://\\S+");
    private static final String DEFAULT_REALM = "default";

    /**
     * The branding of a realm. A setting that the realm leaves out is that of the {@code default} entry, as the
     * manager merges them.
     *
     * @param config     the manager's configuration; null if the manager has none, and then no realm has a branding
     * @param managerUrl the address that the browser can reach the manager at, which the path of a logo is relative to
     */
    static Branding of(JsonNode config, String realm, String managerUrl) {
        JsonNode realms = config == null ? MissingNode.getInstance() : config.path("realms");
        return new Branding(
                primaryColour(setting(realms, realm, "styles")),
                logo(setting(realms, realm, "logo"), managerUrl));
    }

    private static String setting(JsonNode realms, String realm, String name) {
        for (String entry : List.of(realm, DEFAULT_REALM)) {
            JsonNode value = realms.path(entry).path(name);
            if (value.isTextual() && !value.asText().isBlank()) {
                return value.asText();
            }
        }
        return null;
    }

    /** The last declaration wins, as in CSS. */
    private static String primaryColour(String styles) {
        if (styles == null) {
            return null;
        }
        String colour = null;
        Matcher declaration = PRIMARY_COLOUR.matcher(styles);
        while (declaration.find()) {
            colour = declaration.group(1);
        }
        return colour;
    }

    /** A path on the manager, as {@code /images/logo.svg}, or the address of an image elsewhere. */
    private static String logo(String logo, String managerUrl) {
        if (logo == null) {
            return null;
        }
        if (logo.startsWith("/")) {
            return managerUrl + logo;
        }
        return ABSOLUTE_URL.matcher(logo).matches() ? logo : null;
    }
}
