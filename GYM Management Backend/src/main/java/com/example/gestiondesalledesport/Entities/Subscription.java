package com.example.gestiondesalledesport.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Abonnement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAbonnement;

    private String duree;

    private Float prix;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "idUser")
//    private AppUser appUser;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "subscription", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Memebership> membershipList;

}
