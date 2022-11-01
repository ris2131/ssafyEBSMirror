package com.ssafyebs.businessbe.global.config;


import com.ssafyebs.businessbe.global.jwt.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfiguration implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/business/sign-up")
                .excludePathPatterns("/business/check-email")
                .excludePathPatterns("/business/login")
                .excludePathPatterns("/business/verify-email/**")
                .excludePathPatterns("/business/reset-password/**")
                .excludePathPatterns("/search/**");

    }
}