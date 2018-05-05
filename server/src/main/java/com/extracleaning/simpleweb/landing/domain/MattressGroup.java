package com.extracleaning.simpleweb.landing.domain;

import lombok.Data;

@Data
public class MattressGroup {

    private boolean slider = false;
    private Property size = null;
    private Property sides = null;
    private Property number = null;
}
