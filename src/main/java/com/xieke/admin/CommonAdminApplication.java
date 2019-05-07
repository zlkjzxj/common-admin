package com.xieke.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author Administrator
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.xieke.admin")
@EnableTransactionManagement(proxyTargetClass = true)
public class CommonAdminApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(CommonAdminApplication.class, args);
    }

    @Override
    //为了打包springboot项目
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
