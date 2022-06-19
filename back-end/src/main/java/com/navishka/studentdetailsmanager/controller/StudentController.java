package com.navishka.studentdetailsmanager.controller;

import com.navishka.studentdetailsmanager.model.Student;
import com.navishka.studentdetailsmanager.service.StudentService;
import com.navishka.studentdetailsmanager.util.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Map.*;
import static org.springframework.http.HttpStatus.*;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping(value = "/add")
    private ResponseEntity<Response> addStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.saveStudent(student);

            return ResponseEntity.ok(
                    Response.builder()
                            .status(CREATED)
                            .statusCode(CREATED.value())
                            .message("Student details successfully added")
                            .data(of("student", savedStudent))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                    Response.builder()
                            .status(INTERNAL_SERVER_ERROR)
                            .statusCode(INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/list")
    private ResponseEntity<Response> getStudentList() {
        try {
            List<Student> foundStudentList = studentService.getStudentList();

            return ResponseEntity.ok(
                    Response.builder()
                            .status(OK)
                            .statusCode(OK.value())
                            .message("Student List successfully retrieved")
                            .data(of("studentList", foundStudentList))
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    Response.builder()
                            .status(INTERNAL_SERVER_ERROR)
                            .statusCode(INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<Response> getStudent(@PathVariable int id) {
        try {
            Student foundStudent = studentService.getStudentById(id);

            return ResponseEntity.ok(
                    Response.builder()
                            .status(OK)
                            .statusCode(OK.value())
                            .message("Student Details successfully retrieved")
                            .data(of("student", foundStudent))
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    Response.builder()
                            .status(INTERNAL_SERVER_ERROR)
                            .statusCode(INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<Response> updateStudent(@PathVariable int id, @RequestBody Student student) {
        try {
            Student foundStudent = studentService.updateStudent(id, student);

            return ResponseEntity.ok(
                    Response.builder()
                            .status(OK)
                            .statusCode(OK.value())
                            .message("Student Details successfully updated")
                            .data(of("student", foundStudent))
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    Response.builder()
                            .status(INTERNAL_SERVER_ERROR)
                            .statusCode(INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }
}
