package com.example.reportservice.openremote;

import java.util.regex.Pattern;

/** The rules for OpenRemote identifiers. They are put into manager URLs, so they are checked strictly. */
public final class Ids {

    /** An asset ID: OpenRemote's own rule ({@code Constants.ASSET_ID_REGEXP}). */
    public static final Pattern ASSET_ID = Pattern.compile("[0-9A-Za-z]{22}");

    /** An attribute name or an asset type name: word characters, as in {@code AttributeRef}. */
    public static final Pattern NAME = Pattern.compile("\\w+");

    /** A realm name: letters, digits, {@code -} and {@code _}, as OpenRemote's {@code Realm} allows. */
    public static final Pattern REALM = Pattern.compile("[A-Za-z0-9_-]+");

    private Ids() { }
}
