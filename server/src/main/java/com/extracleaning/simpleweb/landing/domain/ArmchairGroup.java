package com.extracleaning.simpleweb.landing.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArmchairGroup {

    private boolean slider = false;
    private Property material = null;
    private Property number = null;
}
