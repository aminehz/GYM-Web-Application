package com.example.gestiondesalledesport.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "Course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCourse;

    private String nom;
    private String horaire;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<AppUser> appUserList;

   @ManyToOne(cascade = CascadeType.ALL)
   @JoinColumn(name ="idUser" )
   @JsonIgnore
    private AppUser appUser;

}
