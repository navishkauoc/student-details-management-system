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

            for (EducationalDetail educationalDetail : student.getEducationalDetailList()) {
                educationalDetail.setStudentId(savedStudent.getId());
                educationalDetailRepository.save(educationalDetail);
            }

            return savedStudent;
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
