package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Entities.Subscription;
import com.example.gestiondesalledesport.Repository.SubscriptionRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Transactional
@AllArgsConstructor
@Service
public class ServiceSubscription implements IServiceSubscription{
    SubscriptionRepository subscriptionRepository;
    @Override
    public void addSubscription(Subscription s) {
        subscriptionRepository.save(s);
    }

    @Override
    public void deleteSubscription(Long idS) {
        subscriptionRepository.deleteById(idS);
    }

    @Override
    public List<Subscription> getAllSubscription() {
        return subscriptionRepository.findAll();
    }

    @Override
    public Subscription getSubscriptionById(Long idS) {
        return subscriptionRepository.findById(idS).orElse(null);
    }
}
