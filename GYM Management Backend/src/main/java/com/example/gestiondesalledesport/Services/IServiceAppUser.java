package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Dto.AppUserDTO;
import com.example.gestiondesalledesport.Entities.AppRole;
import com.example.gestiondesalledesport.Entities.AppUser;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IServiceAppUser {
    public void saveUser(AppUser u, MultipartFile avatar) throws IOException;
    public List<AppUserDTO> getAllUsers();
    public AppUserDTO getUserById(Long id);
    public AppUser getUserByid(Long id);
    public void deleteUser(Long id);
    public void addRole(String role);
    public void addRoleToUser(String username,String role);
    public AppRole getRole(String role);
    public AppUser loadUserByEmail(String email);
    public AppUser loadUserByUsername(String username);
    public Object saveImage(MultipartFile avatar) throws IOException;
    public void addSubscriptionToUser(Long userId,Long subscriptionId);

}
