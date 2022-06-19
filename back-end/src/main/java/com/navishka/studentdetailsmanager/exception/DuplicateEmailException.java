package com.navishka.studentdetailsmanager.exception;

/**
 * @author Navishka
 * @created on 2022-06-20
 */

public class DuplicateEmailException extends RuntimeException {

    public DuplicateEmailException(String message) {
        super(message);
    }

}
