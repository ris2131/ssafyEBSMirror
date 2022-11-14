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
        System.out.println("commit test");
        LocalDate now = LocalDate.now();
        System.out.println(now);
        SpringApplication.run(CustomerBackApplication.class, args);
    }

}
