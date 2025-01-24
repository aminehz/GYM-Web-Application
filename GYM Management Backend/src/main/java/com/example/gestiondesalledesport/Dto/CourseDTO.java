package com.example.gestiondesalledesport.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private Long idCourse;
    private String nom;
    private String horaire;
    private AppUserDTO appUser;
    private List<AppUserDTO> appUserList;

}
