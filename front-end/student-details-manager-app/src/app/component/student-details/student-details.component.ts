import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  displayedColumns: string[] = ['qualification', 'instituteName', 'startedDate', 'endDate', 'grade', 'action'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  studentForm!: FormGroup;

  student !: Student;
  educationalDetailsList: EducationalDetail[] = [];
  studentId!: number;

  actionButton: string = "Save";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private educationalDetailsService: EducationalDetailsService,
    private route: ActivatedRoute
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

    if (this.route.snapshot.paramMap.get('id') != null) {
      this.actionButton = "Update";
      this.studentId = Number(this.route.snapshot.paramMap.get('id'))
      this.studentService.getStudentById(this.studentId).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            this.studentForm.controls['firstName'].setValue(response.data.student.firstName);
            this.studentForm.controls['lastName'].setValue(response.data.student.lastName);
            this.studentForm.controls['contactNumber'].setValue(response.data.student.contactNumber);
            this.studentForm.controls['email'].setValue(response.data.student.email);
            this.studentForm.controls['parentName'].setValue(response.data.student.parentName);
            this.studentForm.controls['parentContactNumber'].setValue(response.data.student.parentContactNumber);
            this.studentForm.controls['parentEmail'].setValue(response.data.student.parentEmail);

            // Setting Educational Details Table data
            this.dataSource = new MatTableDataSource(response.data.student.educationalDetailList);
            this.dataSource.paginator = this.paginator;
            // Update Educational Details list
            this.educationalDetailsService.updateEducationalDetailsList(response.data.student.educationalDetailList);
            this.educationalDetailsList = response.data.student.educationalDetailList;
          } else {
            Swal.fire({
              icon: 'error',
              text: response.message
            })
          }
        }
      )
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(EducationalDetailsDialogComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEducationalDetails();
    });
  }

  goBack() {
    this.educationalDetailsList = [];
    this.educationalDetailsService.emptyEducationalDetailsList();
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
    if (this.route.snapshot.paramMap.get('id') == null) {
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
                this.educationalDetailsList = [];
                this.educationalDetailsService.emptyEducationalDetailsList();
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
    } else {
      this.updateStudent();
    }

  }

  updateStudent() {
    this.student = this.studentForm.value;
    this.student.educationalDetailList = this.educationalDetailsList;
    if (this.student.educationalDetailList.length > 0) {
      this.studentService.updateStudent(Number(this.route.snapshot.paramMap.get('id')), this.student).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            Swal.fire({
              icon: 'success',
              text: response.message
            })
            this.educationalDetailsList = [];
            this.educationalDetailsService.emptyEducationalDetailsList();
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
  }

  editEducationalDetail(row: any) {
    //Opening the Dialog
    const dialogRef1 = this.dialog.open(EducationalDetailsDialogComponent, {
      width: '50%',
      data: row
    });

    dialogRef1.afterClosed().subscribe(result => {
      this.getEducationalDetails();
    });
  }

  deleteEducationalDetail(row: any) {
    this.educationalDetailsService.deleteEducationalDetail(row.id).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.educationalDetailsList = response;
      }
    );
  }

}
