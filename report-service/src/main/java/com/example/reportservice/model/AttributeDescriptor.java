package com.example.reportservice.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

/**
 * An attribute that the assets of a type have.
 *
 * @param name  attribute name
 * @param type  name of the value descriptor that types the value, e.g. {@code number} or {@code text}
 * @param units the units of the value as OpenRemote names them, in parts, e.g. {@code ["litre", "per", "hour"]};
 *              left out of the JSON if the value has no units
 */
record AttributeDescriptor(
        String name,
        String type,
        @JsonInclude(JsonInclude.Include.NON_NULL) List<String> units) { }
