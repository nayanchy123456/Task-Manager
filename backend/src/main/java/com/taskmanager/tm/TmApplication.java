package com.taskmanager.tm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;


@SpringBootApplication
public class TmApplication {

	public static void main(String[] args) {
		SpringApplication.run(TmApplication.class, args);
		System.out.println("started....");
	}

@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}


}
