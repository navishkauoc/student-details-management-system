package com.navishka.studentdetailsmanager.repository;

import com.navishka.studentdetailsmanager.model.EducationalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@Repository
public interface EducationalDetailRepository extends JpaRepository<EducationalDetail, Integer> {

    @Transactional
    void deleteAllByStudentId(int id);
}
