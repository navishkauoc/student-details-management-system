import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EducationalDetailsDialogComponent } from '../educational-details-dialog/educational-details-dialog.component';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { EducationalDetailsService } from 'src/app/service/educational-details.service';
import { EducationalDetail } from 'src/app/model/educational-detail';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  displayedColumns: string[] = ['qualification', 'instituteName', 'startedDate', 'endDate', 'grade'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  studentForm!: FormGroup;

  student !: Student;
  educationalDetailsList: EducationalDetail[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private educationalDetailsService: EducationalDetailsService
  ) {
  }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      parentName: ['', Validators.required],
      parentContactNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      parentEmail: ['', Validators.email]
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(EducationalDetailsDialogComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getEducationalDetails();
    });
  }

  goBack() {
    this.router.navigateByUrl('');
  }

  get f() { return this.studentForm.controls; }

  getEducationalDetails() {
    this.educationalDetailsService.getEducationalDetailsList().subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.educationalDetailsList = response;
      }
    );
  }

  saveStudent() {
    if (this.studentForm.valid) {
      this.student = this.studentForm.value;
      this.student.educationalDetailList = this.educationalDetailsList;
      if (this.student.educationalDetailList.length > 0) {
        this.studentService.saveStudent(this.student).subscribe(
          (response) => {
            if (response.statusCode == 201) {
              Swal.fire({
                icon: 'success',
                text: response.message
              })
              this.router.navigate(['/']);
            } else {
              Swal.fire({
                icon: 'error',
                text: response.message
              })
            }
          }
        )
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please add at least one Education Details set'
        })
      }

    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please fill all required fields'
      })
    }
  }

}
