package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Entities.Subscription;

import java.util.List;

public interface IServiceSubscription {
    public void addSubscription(Subscription s);
    public void deleteSubscription(Long idS);
    public List<Subscription> getAllSubscription();
    public Subscription getSubscriptionById(Long idS);

}
