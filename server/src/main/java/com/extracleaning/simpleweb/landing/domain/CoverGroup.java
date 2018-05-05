package com.extracleaning.simpleweb.landing.domain;

import lombok.Data;

@Data
public class CoverGroup {

    private boolean slider = false;
    private Property type = null;
    private Property height = null;
    private Property width = null;
    private Property params = null;
    private Property material = null;
    private Property number = null;
}
