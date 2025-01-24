package com.example.gestiondesalledesport.Controllers;

import com.example.gestiondesalledesport.Dto.AppUserDTO;
import com.example.gestiondesalledesport.Dto.MembershipDTO;
import com.example.gestiondesalledesport.Dto.SubscriptionDTO;
import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Entities.Memebership;
import com.example.gestiondesalledesport.Entities.Subscription;
import com.example.gestiondesalledesport.Repository.SubscriptionRepository;
import com.example.gestiondesalledesport.Services.IServiceAppUser;
import com.example.gestiondesalledesport.Services.IServiceMembership;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class MembershipController {
    IServiceMembership serviceMembership;
    IServiceAppUser serviceAppUser;
    SubscriptionRepository subscriptionRepository;
    @GetMapping("/membership")
    public ResponseEntity<List<MembershipDTO>> getAllMemberships() {
        List<MembershipDTO> memberships = serviceMembership.getAllMembership();
        List<MembershipDTO> membershipDTOs = new ArrayList<>();

        for (MembershipDTO membership : memberships) {
            MembershipDTO dto = new MembershipDTO();
            dto.setIdMemebership(membership.getIdMemebership());
            dto.setDateAbonnement(membership.getDateAbonnement());
            dto.setDateExpiration(membership.getDateExpiration());
            dto.setDateAbonnement(membership.getDateAbonnement());
            AppUserDTO userDTO = membership.getAppUserDTO();

            SubscriptionDTO subscriptionDTO = null;
            if (membership.getSubscriptionDTO() != null) {
                subscriptionDTO = membership.getSubscriptionDTO();

            }

            dto.setAppUserDTO(userDTO);
            dto.setSubscriptionDTO(subscriptionDTO);
            membershipDTOs.add(dto);
        }

        return ResponseEntity.ok(membershipDTOs);
    }
    @PostMapping("/addMembership/{userId}/{subscriptionId}")
    public ResponseEntity<String> addMembership(
            @PathVariable("userId") Long userId,
            @PathVariable("subscriptionId") Long subscriptionId,
            @RequestBody Memebership membership) {

        try {
            AppUser user = serviceAppUser.getUserByid(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
            }

            Subscription subscription = subscriptionRepository.findById(subscriptionId).orElse(null);
            if (subscription == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subscription not found");
            }

            membership.setAppUser(user);
            membership.setSubscription(subscription);
            serviceMembership.saveMembership(membership);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding membership");
        }

        return ResponseEntity.ok("Membership added");
    }

    @DeleteMapping("/deleteMembership/{id}")
    public ResponseEntity<String> deleteMembership(@PathVariable("id") Long id){
        serviceMembership.deleteMembership(id);
        return ResponseEntity.ok("membership deleted Sucessfully");
    }


    @PostMapping("/getMembership/{id}")
    public ResponseEntity<MembershipDTO> getMembershipById(@PathVariable("id") Long id) {
        MembershipDTO membershipDTO = serviceMembership.getMembershipById(id);
        if (membershipDTO != null) {
            return ResponseEntity.ok(membershipDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
