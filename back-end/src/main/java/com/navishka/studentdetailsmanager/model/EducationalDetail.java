package com.navishka.studentdetailsmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "educational_detail")
public class EducationalDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "qualification", nullable = false)
    private String qualification;

    @Column(name = "institute_name", nullable = false)
    private String instituteName;

    @Column(name = "started_date")
    private Date startedDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "grade", nullable = false)
    private String grade;

    @Column(name = "student_id")
    private int student;

}
