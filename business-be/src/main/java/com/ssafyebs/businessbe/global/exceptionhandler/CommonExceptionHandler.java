package com.ssafyebs.businessbe.global.exceptionhandler;


import com.ssafyebs.businessbe.global.exception.InvalidateRefreshTokenException;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import com.ssafyebs.businessbe.global.exception.NotLoggeedInException;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionHandler {
    @ExceptionHandler(InvalidateRefreshTokenException.class)
    public ResponseEntity<CommonResponse> handleInvalidateRefreshTokenException(RuntimeException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }
    @ExceptionHandler(NoExistBusinessException.class)
    public ResponseEntity<CommonResponse> handleNoExistBusinessException(RuntimeException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CommonResponse.createError(e.getMessage()));
    }
    @ExceptionHandler(NotLoggeedInException.class)
    public ResponseEntity<CommonResponse> handleNotLoggedInException(RuntimeException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    //JwtException
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<CommonResponse> handleJwtException(RuntimeException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }
    //CommonResponse : Fail
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CommonResponse> handleMethodArgumentNotValidException(BindingResult bindingResult){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CommonResponse.createFail(bindingResult));
    }
}