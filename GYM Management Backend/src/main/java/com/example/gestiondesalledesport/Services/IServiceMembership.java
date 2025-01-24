package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Dto.MembershipDTO;
import com.example.gestiondesalledesport.Entities.Memebership;

import java.util.List;

public interface IServiceMembership {
    public void saveMembership(Memebership m);
    public List<MembershipDTO> getAllMembership();
    public void deleteMembership(Long idM);
    public MembershipDTO getMembershipById(Long idM);
}
