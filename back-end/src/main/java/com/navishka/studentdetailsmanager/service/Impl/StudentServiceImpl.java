package com.navishka.studentdetailsmanager.service.Impl;

import com.navishka.studentdetailsmanager.exception.DuplicateEmailException;
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
import java.util.Optional;

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

            // Checking whether the student email is unique
            List<Student> studentListWithSameEmail = studentRepository.findAllByEmail(student.getEmail());
            if (studentListWithSameEmail.size() > 0) {
                throw new DuplicateEmailException("Student Email Already Registered");
            }

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
            throw e;
        }
    }

    @Override
    public Student getStudentById(int id) {
        try {
            log.info("Retrieving Student details with Student ID: {}", id);

            Optional<Student> optionalStudent = studentRepository.findById(id);

            if (optionalStudent.isPresent()) {
                return optionalStudent.get();
            } else {
                throw new RuntimeException("Cannot find Student with the given ID");
            }
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public Student updateStudent(int id, Student student) {
        try {
            log.info("Updating Student details with Student ID: {}", id);

            Optional<Student> optionalStudent = studentRepository.findById(id);

            if (optionalStudent.isPresent()) {
                Student foundStudent = optionalStudent.get();

                // Checking whether the student email is unique
                if (!foundStudent.getEmail().equalsIgnoreCase(student.getEmail())) {
                    List<Student> studentListWithSameEmail = studentRepository.findAllByEmail(student.getEmail());
                    if (studentListWithSameEmail.size() > 0) {
                        throw new DuplicateEmailException("Student Email Already Registered");
                    }
                }

                student.setId(foundStudent.getId());
                Student savedStudent = studentRepository.save(student);

                educationalDetailRepository.deleteAllByStudentId(savedStudent.getId());

                for (EducationalDetail educationalDetail: student.getEducationalDetailList()) {
                    educationalDetail.setStudentId(savedStudent.getId());
                    educationalDetailRepository.save(educationalDetail);
                }

                return savedStudent;
            } else {
                throw new RuntimeException("Cannot find Student with the given ID");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }
    }

    @Override
    public Boolean deleteStudent(int id) {
        try {
            educationalDetailRepository.deleteAllByStudentId(id);

            studentRepository.deleteById(id);

            return Boolean.TRUE;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }
    }
}
