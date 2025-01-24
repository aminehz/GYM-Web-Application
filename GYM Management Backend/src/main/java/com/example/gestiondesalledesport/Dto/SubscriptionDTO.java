package com.example.gestiondesalledesport.Dto;

import com.example.gestiondesalledesport.Entities.Memebership;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {

    private Long idAbonnement;

    private String duree;

    private Float prix;

    private List<Memebership> membershipList;
}
