package com.example.gestiondesalledesport.Security;

import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Repository.AppUserRepository;
import com.example.gestiondesalledesport.Services.IServiceAppUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@AllArgsConstructor
public class userDetailsServiceImplementation implements UserDetailsService {
    IServiceAppUser serviceAppUser;
    AppUserRepository appUserRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser=appUserRepository.findAppUsersByUsername(username);
        if(appUser==null) throw new UsernameNotFoundException("user not found");
        List<GrantedAuthority> authorities=new ArrayList<>();
        appUser.getRoles().forEach(e->authorities.add(new SimpleGrantedAuthority(e.getRole())));
        return new User(appUser.getUsername(),appUser.getPassword(),authorities);
    }
}
