package com.example.gestiondesalledesport.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "AppUser")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @NotEmpty
    @Size(min=1,max=20)
    private String email;

    private String username;

    private String password;

    private String avatar;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<AppRole> roles;

//    @OneToMany(fetch = FetchType.LAZY,mappedBy = "appUser",cascade = CascadeType.ALL)
//    private List<Subscription> subscriptionList;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "appUser",cascade = CascadeType.ALL)
    private List<Memebership> memebershipList;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "appUser",cascade = CascadeType.ALL)
    private List<Course> courseList;


}
