package com.navishka.studentdetailsmanager.service.Impl;

import com.navishka.studentdetailsmanager.model.EducationalDetail;
import com.navishka.studentdetailsmanager.model.Student;
import com.navishka.studentdetailsmanager.repository.EducationalDetailRepository;
import com.navishka.studentdetailsmanager.repository.StudentRepository;
import com.navishka.studentdetailsmanager.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final EducationalDetailRepository educationalDetailRepository;

    @Override
    public Student saveStudent(Student student) {
        try {
            log.info("Saving new Student: {}", student.getFirstName());
            Student savedStudent = studentRepository.save(student);

            if (student.getEducationalDetailList() != null) {
                for (EducationalDetail educationalDetail : student.getEducationalDetailList()) {
                    educationalDetail.setStudentId(savedStudent.getId());
                    educationalDetailRepository.save(educationalDetail);
                }
            } else {
                throw new RuntimeException("At least one set of Educational Details is required");
            }


            return savedStudent;
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public List<Student> getStudentList() {
        try {
            log.info("Retrieving Student list");

            List<Student> studentList = studentRepository.findAll();

            return studentList;
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
