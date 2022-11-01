package com.ssafyebs.customerback;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CustomerBackApplication {
	
	@PostConstruct
	void Started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

    public static void main(String[] args) {
        System.out.println("commit test");
        SpringApplication.run(CustomerBackApplication.class, args);
    }

}
