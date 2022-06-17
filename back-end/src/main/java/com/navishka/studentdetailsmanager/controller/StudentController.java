package com.navishka.studentdetailsmanager.controller;

import com.navishka.studentdetailsmanager.model.Student;
import com.navishka.studentdetailsmanager.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping(value = "/add")
    private Student addStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.saveStudent(student);

            return savedStudent;
        } catch (Exception e) {
            throw e;
        }
    }
}
