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
public class AppUserDTO {
    private Long idUser;
    private String email;
    private String username;
    private String avatar;
    private List<String> roles;
}
