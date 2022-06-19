package com.navishka.studentdetailsmanager.service;

import com.navishka.studentdetailsmanager.model.Student;

import java.util.List;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

public interface StudentService {

    Student saveStudent(Student student);

    List<Student> getStudentList();

    Student getStudentById(int id);

    Student updateStudent(int id, Student student);

    Boolean deleteStudent(int id);
}
