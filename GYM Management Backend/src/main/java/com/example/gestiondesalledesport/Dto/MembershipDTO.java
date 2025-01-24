package com.example.gestiondesalledesport.Dto;

import com.example.gestiondesalledesport.Entities.Subscription;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MembershipDTO {
    private Long idMemebership;
    private Date dateAbonnement;
    private Date dateExpiration;
    private AppUserDTO appUserDTO;
    private SubscriptionDTO subscriptionDTO;
    public void setSubscriptionDTO(SubscriptionDTO subscriptionDTO) {
        this.subscriptionDTO = subscriptionDTO;
    }
}
