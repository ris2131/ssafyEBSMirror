package com.ssafyebs.customerback.global.exception;

public class InvalidateRefreshTokenException extends RuntimeException{
    public InvalidateRefreshTokenException(String message){
        super(message);
    }
}
