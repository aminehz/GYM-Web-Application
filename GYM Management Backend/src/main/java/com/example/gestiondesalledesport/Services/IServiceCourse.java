package com.example.gestiondesalledesport.Services;

import com.example.gestiondesalledesport.Dto.CourseDTO;
import com.example.gestiondesalledesport.Entities.Course;

import java.util.List;

public interface IServiceCourse {
    public void addCourse(Course c);
    public void deleteCourse(Long id);
    public List<CourseDTO> getAllCourseDTOs();
    public Course getCourseById(Long id);
    public void addTrainerToCourse(Long trainerId,Long courseId);
    public void addMemberToCourse(Long memberId,Long courseId);
    public CourseDTO getCourseDTOById(Long id);
}
