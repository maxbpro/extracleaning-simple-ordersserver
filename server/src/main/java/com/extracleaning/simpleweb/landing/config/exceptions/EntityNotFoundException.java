package com.extracleaning.simpleweb.landing.config.exceptions;


public class EntityNotFoundException extends Exception {

    public EntityNotFoundException(Class clazz) {
        super(clazz.getSimpleName());
    }

}
