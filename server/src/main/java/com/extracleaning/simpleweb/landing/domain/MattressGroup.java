package com.extracleaning.simpleweb.landing.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MattressGroup {

    private boolean slider = false;
    private Property size = null;
    private Property sides = null;
    private Property number = null;
}
