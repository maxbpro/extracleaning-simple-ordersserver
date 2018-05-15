package com.extracleaning.simpleweb.landing.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CouchGroup {

    private boolean slider = false;
    private Property size = null;
    private Property moves = null;
    private Property material = null;
    private Property number = null;
}
