package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Dto.AppUserDTO;
import com.example.gestiondesalledesport.Entities.AppRole;
import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Entities.Memebership;
import com.example.gestiondesalledesport.Entities.Subscription;
import com.example.gestiondesalledesport.Repository.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@AllArgsConstructor
@Service
public class ServiceAppUser implements IServiceAppUser{
    private AppUserRepository appUserRepository;
    private AppRoleRepository appRoleRepository;
    private CourseRepository courseRepository;
    private SubscriptionRepository subscriptionRepository;
    private MemebershipRepository membershipRepository;
    private PasswordEncoder passwordEncoder;
    @Override
    public void saveUser(AppUser u, MultipartFile avatar) throws IOException {
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        if(avatar!=null && (!avatar.isEmpty())){
            u.setAvatar((String) saveImage(avatar));
        }
        appUserRepository.save(u);
    }

    public Object saveImage(MultipartFile avatar) throws IOException {
        String nomAvatar=avatar.getOriginalFilename();
        String tab[]=nomAvatar.split("\\.");
        String newName=tab[0]+System.currentTimeMillis()+"."+tab[1];
        File f=new ClassPathResource("static/photos").getFile();
        String chemin=f.getAbsolutePath();
        Path p= Paths.get(chemin,newName);
        Files.write(p,avatar.getBytes());
        return newName;
    }

    @Override
    public void addSubscriptionToUser(Long userId, Long subscriptionId) {
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        Subscription subscription = subscriptionRepository.findById(subscriptionId).orElse(null);

        if (appUser != null && subscription != null) {
            Memebership membership = new Memebership();
            membership.setDateAbonnement(new Date());
            membership.setAppUser(appUser);
            membership.setSubscription(subscription);

            membershipRepository.save(membership);
        } else {

        }
    }


    @Override
    public List<AppUserDTO> getAllUsers() {
        List<AppUser> users = appUserRepository.findAll();
        List<AppUserDTO> userDTOList = new ArrayList<>();

        for (AppUser user : users) {
            AppUserDTO userDTO = new AppUserDTO();
            userDTO.setIdUser(user.getIdUser());
            userDTO.setEmail(user.getEmail());
            userDTO.setUsername(user.getUsername());
            userDTO.setAvatar(user.getAvatar());


            List<String> userRoles = user.getRoles().stream().map(AppRole::getRole).collect(Collectors.toList());
            userDTO.setRoles(userRoles);

            userDTOList.add(userDTO);
        }

        return userDTOList;
    }

    @Override
    public AppUserDTO getUserById(Long id) {
        AppUser user = appUserRepository.findById(id).orElse(null);
        if (user != null) {
            AppUserDTO userDTO = new AppUserDTO();
            userDTO.setIdUser(user.getIdUser());
            userDTO.setEmail(user.getEmail());
            userDTO.setUsername(user.getUsername());
            userDTO.setAvatar(user.getAvatar());

            List<String> userRoles = user.getRoles().stream().map(AppRole::getRole).collect(Collectors.toList());
            userDTO.setRoles(userRoles);

            return userDTO;
        } else {
            return null;
        }
    }

    @Override
    public AppUser getUserByid(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        appUserRepository.deleteById(id);
    }

    @Override
    public void addRole(String role) {
        appRoleRepository.save(AppRole.builder().role(role).build());

    }

    @Override
    public void addRoleToUser(String username, String role) {
        AppUser user=loadUserByUsername(username);
        AppRole rol=appRoleRepository.findById(role).orElse(null);
        user.getRoles().add(rol);
    }

    @Override
    public AppRole getRole(String role) {
        return appRoleRepository.findById(role).orElse(null);
    }


    @Override
    public AppUser loadUserByEmail(String email) {
        return appUserRepository.findAppUsersByEmail(email);
    }

    @Override
    public AppUser loadUserByUsername(String username) {
        return appUserRepository.findAppUsersByUsername(username);
    }



}
