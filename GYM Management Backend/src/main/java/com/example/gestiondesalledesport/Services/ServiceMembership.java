package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Dto.AppUserDTO;
import com.example.gestiondesalledesport.Dto.MembershipDTO;
import com.example.gestiondesalledesport.Dto.SubscriptionDTO;
import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Entities.Memebership;
import com.example.gestiondesalledesport.Entities.Subscription;
import com.example.gestiondesalledesport.Repository.MemebershipRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Transactional
@AllArgsConstructor
@Service
public class ServiceMembership implements IServiceMembership{
    MemebershipRepository membershipRepository;
    @Override
    public void saveMembership(Memebership m) {
        membershipRepository.save(m);
    }

    public List<MembershipDTO> getAllMembership() {
        List<Memebership> memberships = membershipRepository.findAll();
        List<MembershipDTO> membershipDTOs = new ArrayList<>();

        for (Memebership membership : memberships) {
            MembershipDTO dto = new MembershipDTO();
            dto.setIdMemebership(membership.getIdMemebership());
            dto.setDateAbonnement(membership.getDateAbonnement());
            dto.setDateExpiration(membership.getDateExpiration());

            AppUser user = membership.getAppUser();
            AppUserDTO userDTO = new AppUserDTO();
            userDTO.setIdUser(user.getIdUser());
            userDTO.setEmail(user.getEmail());
            userDTO.setUsername(user.getUsername());
            userDTO.setAvatar(user.getAvatar());
            dto.setAppUserDTO(userDTO);

            Subscription subscription = membership.getSubscription();
            if (subscription != null) {
                SubscriptionDTO subscriptionDTO = new SubscriptionDTO();
                subscriptionDTO.setIdAbonnement(subscription.getIdAbonnement());
                subscriptionDTO.setDuree(subscription.getDuree());
                subscriptionDTO.setPrix(subscription.getPrix());
                dto.setSubscriptionDTO(subscriptionDTO);
            } else {

            }

            membershipDTOs.add(dto);
        }

        return membershipDTOs;
    }

    @Override
    public void deleteMembership(Long idM) {
        membershipRepository.deleteById(idM);
    }

    @Override
    public MembershipDTO getMembershipById(Long id) {
        Memebership membership = membershipRepository.findById(id).orElse(null);
        if (membership != null) {
            MembershipDTO dto = new MembershipDTO();
            dto.setIdMemebership(membership.getIdMemebership());
            dto.setDateAbonnement(membership.getDateAbonnement());
            dto.setDateExpiration(membership.getDateExpiration());
            AppUser user=membership.getAppUser();
            AppUserDTO userDTO = new AppUserDTO();
            userDTO.setIdUser(user.getIdUser());
            userDTO.setEmail(user.getEmail());
            userDTO.setUsername(user.getUsername());
            userDTO.setAvatar(user.getAvatar());
            dto.setAppUserDTO(userDTO);

            return dto;
        }
        return null;
    }
}
