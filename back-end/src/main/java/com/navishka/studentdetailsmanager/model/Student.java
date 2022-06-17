package com.navishka.studentdetailsmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * @author Navishka
 * @created on 2022-06-17
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "contact_number", nullable = false)
    private long contactNumber;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "parent_name", nullable = false)
    private String parentName;

    @Column(name = "parent_contact_number", nullable = false)
    private long parentContactNumber;

    @Column(name = "parent_email")
    private String parentEmail;

    @OneToMany
    @JoinColumn(name = "student_id")
    private List<EducationalDetail> educationalDetailList;

}
