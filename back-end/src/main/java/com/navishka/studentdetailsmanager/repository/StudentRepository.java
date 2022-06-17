package com.navishka.studentdetailsmanager.repository;

import com.navishka.studentdetailsmanager.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
