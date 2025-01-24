package com.example.gestiondesalledesport.Controllers;

import com.example.gestiondesalledesport.Dto.AppUserDTO;
import com.example.gestiondesalledesport.Entities.AppRole;
import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Repository.AppRoleRepository;
import com.example.gestiondesalledesport.Repository.AppUserRepository;
import com.example.gestiondesalledesport.Services.IServiceAppUser;
import com.example.gestiondesalledesport.Services.IServiceSubscription;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.management.relation.Role;
import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class AppUserController {
IServiceAppUser serviceAppUser;
IServiceSubscription serviceSubscription;
AppRoleRepository appRoleRepository;
AppUserRepository appUserRepository;
    @GetMapping("/users")
    public List<AppUserDTO> getAllUsers() {
        List<AppUserDTO> userList = serviceAppUser.getAllUsers();
        return userList;
    }
@PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestPart(value = "appuser") AppUser appUser, @RequestPart(value = "file",required = false)MultipartFile file) throws IOException{
    serviceAppUser.saveUser(appUser,file);
    return ResponseEntity.ok("User added");
}
@GetMapping("/getRoles")
public ResponseEntity<List <AppRole>> getAllRoles(){
        return ResponseEntity.ok(appRoleRepository.findAll());

}

@GetMapping("/user/{username}")
public AppUser getUserByUsername(@PathVariable("username") String username){
        return appUserRepository.findAppUsersByUsername(username);
}

@GetMapping("/getUser/{id}")
public AppUserDTO getUserById(@PathVariable("id") Long id){
        AppUserDTO user=serviceAppUser.getUserById(id);
        return user;
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable("id") Long userId,
            @RequestBody AppUser updatedUser,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        try {
            AppUser existingUser = serviceAppUser.getUserByid(userId);

            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            String updatedEmail = updatedUser.getEmail();
            if (updatedEmail != null && !updatedEmail.isEmpty()) {
                existingUser.setEmail(updatedEmail);
            }

            existingUser.setUsername(updatedUser.getUsername());


            if (avatar != null && !avatar.isEmpty()) {

            }

            serviceAppUser.saveUser(existingUser,avatar);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }

@DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
    serviceAppUser.deleteUser(id);
    return ResponseEntity.ok("user Deleted.");
}

@PostMapping("/addSubscriptionToMember/{idM}/{idS}")
    public ResponseEntity<String> addSubscriptionToMember(@PathVariable("idM") Long idM, @PathVariable("idS") Long idS)
    {try {
        serviceAppUser.addSubscriptionToUser(idM,idS);
        return ResponseEntity.ok("Subscription added to member");
    }catch (Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Add subscription"+e.getMessage());
    }

    }


}
