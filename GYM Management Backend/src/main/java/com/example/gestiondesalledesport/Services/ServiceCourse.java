package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Dto.AppUserDTO;
import com.example.gestiondesalledesport.Dto.CourseDTO;
import com.example.gestiondesalledesport.Entities.AppUser;
import com.example.gestiondesalledesport.Entities.Course;
import com.example.gestiondesalledesport.Repository.AppUserRepository;
import com.example.gestiondesalledesport.Repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Transactional
@AllArgsConstructor
@Service
public class ServiceCourse implements IServiceCourse{
    CourseRepository courseRepository;
    AppUserRepository appUserRepository;
    @Override
    public void addCourse(Course c) {
        courseRepository.save(c);
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }


    public List<CourseDTO> getAllCourseDTOs() {
        List<Course> courses = courseRepository.findAll();
        List<CourseDTO> courseDTOs = new ArrayList<>();

        for (Course course : courses) {
            CourseDTO courseDTO = convertToCourseDTO(course);
            courseDTOs.add(courseDTO);
        }

        return courseDTOs;
    }

    private CourseDTO convertToCourseDTO(Course course) {
        CourseDTO courseDTO = new CourseDTO();

        courseDTO.setIdCourse(course.getIdCourse());
        courseDTO.setNom(course.getNom());
        courseDTO.setHoraire(course.getHoraire());

        if (course.getAppUserList() != null && !course.getAppUserList().isEmpty()) {
            List<AppUserDTO> appUserDTOList = new ArrayList<>();
            for (AppUser user : course.getAppUserList()) {
                AppUserDTO userDTO = convertToAppUserDTO(user);
                appUserDTOList.add(userDTO);
            }
            courseDTO.setAppUserList(appUserDTOList);
        }


        if (course.getAppUser() != null) {
            AppUserDTO appUserDTO = convertToAppUserDTO(course.getAppUser());
            courseDTO.setAppUser(appUserDTO);
        }

        return courseDTO;
    }

    private AppUserDTO convertToAppUserDTO(AppUser appUser) {
        AppUserDTO appUserDTO = new AppUserDTO();

        appUserDTO.setIdUser(appUser.getIdUser());
        appUserDTO.setEmail(appUser.getEmail());
        appUserDTO.setUsername(appUser.getUsername());


        return appUserDTO;
    }
    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }
    public CourseDTO getCourseDTOById(Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course != null) {
            return convertToCourseDTO(course);
        }
        return null;
    }




    @Override
    public void addTrainerToCourse(Long trainerId, Long courseId) {
        Course course=courseRepository.findById(courseId).orElse(null);
        System.out.println(course);
        AppUser user=appUserRepository.findById(trainerId).orElse(null);
        if(course!=null && user!=null){
            course.setAppUser(user);
            courseRepository.save(course);
        }else {
            if(course == null && user == null){
                throw new EntityNotFoundException("Course and User not found");
            } else if (course == null) {
                throw  new EntityNotFoundException("Course not found");

            }
            else {
                throw new EntityNotFoundException("User not found");
            }
        }
    }
    public void addMemberToCourse(Long memberId, Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        AppUser member = appUserRepository.findById(memberId).orElse(null);

        if (course != null && member != null) {
            List<AppUser> userList = course.getAppUserList();

            if (!userList.contains(member)) {
                userList.add(member);
                course.setAppUserList(userList);
                courseRepository.save(course);
            } else {


                throw new IllegalArgumentException("Member is already associated with the course");
            }
        } else {

            if (course == null && member == null) {
                throw new EntityNotFoundException("Course and User not found");
            } else if (course == null) {
                throw new EntityNotFoundException("Course not found");
            } else {
                throw new EntityNotFoundException("User not found");
            }
        }
    }
}

