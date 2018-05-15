package com.extracleaning.simpleweb.landing.domain;

import lombok.Data;

@Data
public class Property {

    private String value;

    public Property(String value) {
        this.value = value;
    }

    public Property() {
    }
}
