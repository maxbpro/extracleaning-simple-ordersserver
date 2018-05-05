package com.extracleaning.simpleweb.landing.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class SimpleOrder {


    @NotNull
    private String phone;

    private String address;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "UTC")
    private LocalDateTime date;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "UTC")
    private LocalDateTime time;

    private boolean armchair;

    private boolean mattress;

    private boolean chair;

    private boolean couch;

    private boolean cover;
}
