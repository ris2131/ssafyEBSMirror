package com.ssafyebs.customerback;

import java.time.LocalDate;
import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CustomerBackApplication {
	
	@PostConstruct
	void Started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

    public static void main(String[] args) {
        LocalDate now = LocalDate.now();
        SpringApplication.run(CustomerBackApplication.class, args);
    }

}
