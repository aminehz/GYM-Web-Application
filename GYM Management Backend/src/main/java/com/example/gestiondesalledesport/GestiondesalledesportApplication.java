package com.example.gestiondesalledesport;

import com.example.gestiondesalledesport.Entities.AppRole;
import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Services.IServiceAppUser;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class GestiondesalledesportApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestiondesalledesportApplication.class, args);

    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//     @Bean
//    CommandLineRunner commandLineRunner(IServiceAppUser serviceAppUser){
//        return args -> {
//            serviceAppUser.addRole("TRAINER");
//            serviceAppUser.addRole("ADMIN");
//            serviceAppUser.addRole("MEMBER");
//            List<AppRole> roleList=new ArrayList<>();
//           roleList.add(serviceAppUser.getRole("ADMIN"));
//           AppUser user =new AppUser();
//            user.setUsername("admin");
//          user.setEmail("admin@admin.com");
//           user.setPassword("test123");
//           serviceAppUser.saveUser(user,null);
//          serviceAppUser.addRoleToUser("admin","ADMIN");
//
//
//        };
//        }
}
