package com.ssafyebs.businessbe.global.config;


import com.ssafyebs.businessbe.global.jwt.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfiguration implements WebMvcConfigurer {
    @Value("${front-base-url}")
    String FRONT_BASE_URL;

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

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(FRONT_BASE_URL)
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");
    }
}