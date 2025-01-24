package com.example.gestiondesalledesport.Repository;

import com.example.gestiondesalledesport.Entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser,Long> {
    public AppUser findAppUsersByEmail(String email);
    public AppUser findAppUsersByUsername(String username);
}
