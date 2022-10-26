package com.ssafyebs.customerback.global.s3;

import org.springframework.web.multipart.MultipartFile;

public interface S3UploaderService {
    public void uploadPicture(MultipartFile multipartFile, String fileName);
}
