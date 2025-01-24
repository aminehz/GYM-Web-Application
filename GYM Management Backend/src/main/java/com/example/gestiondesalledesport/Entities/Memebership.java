package com.example.gestiondesalledesport.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Memebership")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Memebership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMemebership;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateAbonnement;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateExpiration;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idUser")
    private AppUser appUser;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idAbonnement")
    private Subscription subscription;


}
