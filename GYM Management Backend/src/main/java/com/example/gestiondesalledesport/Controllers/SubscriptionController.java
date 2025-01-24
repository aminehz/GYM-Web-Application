package com.example.gestiondesalledesport.Controllers;

import com.example.gestiondesalledesport.Entities.Subscription;
import com.example.gestiondesalledesport.Services.IServiceSubscription;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class SubscriptionController {
    IServiceSubscription serviceSubscription;
    @GetMapping("/subscription")
    public List<Subscription> getAllSubscription(){
            return serviceSubscription.getAllSubscription();
    }

    @PostMapping("/addSubscription")
    public ResponseEntity<String> addSubscription(@RequestBody Subscription s){
        serviceSubscription.addSubscription(s);
        return ResponseEntity.ok("subcription added");
    }

    @DeleteMapping("/deleteSubscription/{id}")
    public ResponseEntity<String> deleteSubscription(@PathVariable("id") Long id){
        serviceSubscription.deleteSubscription(id);
        return ResponseEntity.ok("subscription deleted");
    }

    @GetMapping("/getSubscription/{id}")
    public Subscription getSubscriptionById(@PathVariable("id") Long id)
    {
     Subscription s= serviceSubscription.getSubscriptionById(id);
        return s;
    }

    @PutMapping("/updateSubscription/{id}")
    public ResponseEntity<String> updateSubscription(@PathVariable("id") Long id , @RequestBody Subscription updatedSubscription)
    {
        try {
            Subscription existingSubscription=serviceSubscription.getSubscriptionById(id);
            if(existingSubscription == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subscription not found");
            }
            existingSubscription.setDuree(updatedSubscription.getDuree());
            existingSubscription.setPrix(updatedSubscription.getPrix());
            serviceSubscription.addSubscription(existingSubscription);

    }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating course");
        }

        return ResponseEntity.ok("subscription updated ");
    }
}
