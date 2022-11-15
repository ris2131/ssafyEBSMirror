package com.ssafyebs.customerback.global.exception;

public class AccessNotGrantedException extends RuntimeException{
	public AccessNotGrantedException(String message) {
		super(message);
	}
}
