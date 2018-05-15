package com.extracleaning.simpleweb.landing.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Order {

    @Id
    private String id;

    @NotNull
    private String phone;

    private String address;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "UTC")
    private LocalDateTime date;

    private ArmchairGroup armchairGroup;

    private MattressGroup mattressGroup;

    private ChairGroup chairGroup;

    private CouchGroup couchGroup;

    private CoverGroup coverGroup;
}
