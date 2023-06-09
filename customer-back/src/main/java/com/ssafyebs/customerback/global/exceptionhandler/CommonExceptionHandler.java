package com.ssafyebs.customerback.global.exceptionhandler;

import com.ssafyebs.customerback.global.exception.*;
import com.ssafyebs.customerback.global.response.CommonResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionHandler {
    @ExceptionHandler(AccessNotGrantedException.class)
    public ResponseEntity<CommonResponse<?>> handleReservationSeqNotGrantedException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(DuplicateDiaryException.class)
    public ResponseEntity<CommonResponse<?>> handleDuplicateDiaryException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(DuplicateNicknameException.class)
    public ResponseEntity<CommonResponse<?>> handleDuplicateNicknameException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(EmptyDiaryException.class)
    public ResponseEntity<CommonResponse<?>> handleEmptyDiaryException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CommonResponse.createError((e.getMessage())));
    }

    @ExceptionHandler(EmptyFileException.class)
    public ResponseEntity<CommonResponse<?>> handleEmptyFileException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(ExistDiaryException.class)
    public ResponseEntity<CommonResponse<?>> handleExistDiaryException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(ExistNicknameException.class)
    public ResponseEntity<CommonResponse<?>> handleExistNicknameException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(FileNotWritableException.class)
    public ResponseEntity<CommonResponse<?>> handleFileNotWritableException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(FileUploadFailedException.class)
    public ResponseEntity<CommonResponse<?>> handleFileUploadFailedException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(FirstGoogleLoginException.class)
    public ResponseEntity<CommonResponse<?>> handleFirstGoogleLoginException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess(e.getMessage(), null));
    }

    @ExceptionHandler(InvalidateRefreshTokenException.class)
    public ResponseEntity<CommonResponse<?>> handleInvalidateRefreshTokenException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(InvalidFileException.class)
    public ResponseEntity<CommonResponse<?>> handleInvalidFileException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(InvalidReservationSeqException.class)
    public ResponseEntity<CommonResponse<?>> handleInvalidReservationSeqException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(NoExistMemberException.class)
    public ResponseEntity<CommonResponse<?>> handleNoExistMemberException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(NoGoogleAuthorizeException.class)
    public ResponseEntity<CommonResponse<?>> handleNoGoogleAuthorizeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(NoMatchCurPasswordException.class)
    public ResponseEntity<CommonResponse<?>> NoMatchCurPasswordException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(NoSuchFileException.class)
    public ResponseEntity<CommonResponse<?>> NoSuchFileException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(NotLoggedInException.class)
    public ResponseEntity<CommonResponse<?>> handleNotLoggedInException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    //Fail??
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CommonResponse<?>> handleMethodArgumentNotValidException(BindingResult bindingResult) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CommonResponse.createFail(bindingResult));
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<CommonResponse<?>> handleJwtException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(DuplicateDateException.class)
    public ResponseEntity<CommonResponse<?>> handleDuplicateDateException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(NoExistSubscriptionException.class)
    public ResponseEntity<CommonResponse<?>> handleNoExistSubscriptionException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CommonResponse.createError(e.getMessage()));
    }

    @ExceptionHandler(DuplicateSubscriptionException.class)
    public ResponseEntity<CommonResponse<?>> handleDuplicateSubscriptionException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(CommonResponse.createError(e.getMessage()));
    }
}

