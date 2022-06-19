package com.navishka.studentdetailsmanager.util;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.util.Map;

/**
 * @author Navishka
 * @created on 2022-06-19
 */

@Data
@SuperBuilder
public class Response {
    private int statusCode;
    private HttpStatus status;
    private String message;
    private Map<?, ?> data;
}
