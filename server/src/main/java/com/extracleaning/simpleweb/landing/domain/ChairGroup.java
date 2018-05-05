package com.extracleaning.simpleweb.landing.domain;

import lombok.Data;

@Data
public class ChairGroup {

    private boolean slider = false;
    private Property type = null;
    private Property material = null;
    private Property number = null;
}
