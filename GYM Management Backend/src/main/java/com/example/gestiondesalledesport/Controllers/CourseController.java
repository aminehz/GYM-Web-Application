package com.example.gestiondesalledesport.Controllers;

import com.example.gestiondesalledesport.Dto.CourseDTO;
import com.example.gestiondesalledesport.Entities.Course;
import com.example.gestiondesalledesport.Services.IServiceCourse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")

public class CourseController {
    IServiceCourse serviceCourse;

    @GetMapping("/courses")
    public List<CourseDTO> getAllCourses() {
        List<CourseDTO> courseDTOs = serviceCourse.getAllCourseDTOs();
        return courseDTOs;
    }

    @PostMapping("/addCourse")
    public ResponseEntity<String> addCourse(@RequestBody Course c){
        serviceCourse.addCourse(c);
        return ResponseEntity.ok("Course added");
    }

    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable("id") Long id){
        serviceCourse.deleteCourse(id);
        return ResponseEntity.ok("Course deleted !");
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable("id") Long id) {
        CourseDTO courseDTO = serviceCourse.getCourseDTOById(id);

        if (courseDTO != null) {
            return ResponseEntity.ok(courseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

@PostMapping("/addTrainerToCourse/{idT}/{idC}")
    public ResponseEntity<String> addTrainerToCourse(@PathVariable("idT") Long idT,@PathVariable("idC") Long idC){
        serviceCourse.addTrainerToCourse(idT,idC);
        return ResponseEntity.ok("Trainer add to the course");
}

@PostMapping("/addMemberToCourse/{idM}/{idC}")
    public ResponseEntity<String> addMemberToCourse(@PathVariable("idM") Long idM,@PathVariable("idC") Long idC){
        serviceCourse.addMemberToCourse(idM, idC);
        return ResponseEntity.ok("Member added to the course");
}

    @PutMapping("/updateCourse/{id}")
    public ResponseEntity<String> updateCourse(
            @PathVariable("id") Long courseId,
            @RequestBody Course updatedCourse) {
        try {
            Course existingCourse = serviceCourse.getCourseById(courseId);

            if (existingCourse == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
            }

            existingCourse.setNom(updatedCourse.getNom());
            existingCourse.setHoraire(updatedCourse.getHoraire());


            serviceCourse.addCourse(existingCourse);

            return ResponseEntity.ok("Course updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating course");
        }
    }

}
