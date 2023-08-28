package com.finance.demobank_v2;

import com.finance.demobank_v2.fileManagement.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class DemobankV2Application {

    public static void main(String[] args) {
        SpringApplication.run(DemobankV2Application.class, args);
    }

}
