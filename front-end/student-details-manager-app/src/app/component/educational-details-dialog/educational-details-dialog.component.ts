import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { EducationalDetail } from 'src/app/model/educational-detail';
import { EducationalDetailsService } from 'src/app/service/educational-details.service';

@Component({
  selector: 'app-educational-details-dialog',
  templateUrl: './educational-details-dialog.component.html',
  styleUrls: ['./educational-details-dialog.component.css']
})
export class EducationalDetailsDialogComponent implements OnInit {

  educationalDetailsForm!: FormGroup;

  educationalDetail !: EducationalDetail;

  maxDate: any;

  actionButton: string = "Add";

  constructor(
    private formBuilder: FormBuilder,
    private educationalDetailsService: EducationalDetailsService,
    private dialogRef: MatDialogRef<EducationalDetailsDialogComponent>,
    private datepipe: DatePipe,
    //Injecting edit data
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.educationalDetailsForm = this.formBuilder.group({
      qualification: ['', Validators.required],
      instituteName: ['', Validators.required],
      startedDate: ['', Validators.required],
      endDate: ['', Validators.required],
      grade: ['', Validators.required]
    })

    this.maxDate = new Date;

    // Setting the data to input field when editing
    if (this.editData) {
      this.actionButton = "Update";
      this.educationalDetailsForm.controls['qualification'].setValue(this.editData.qualification);
      this.educationalDetailsForm.controls['instituteName'].setValue(this.editData.instituteName);
      this.educationalDetailsForm.controls['startedDate'].setValue(this.editData.startedDate);
      this.educationalDetailsForm.controls['endDate'].setValue(this.editData.endDate);
      this.educationalDetailsForm.controls['grade'].setValue(this.editData.grade);
    }
  }

  get f() { return this.educationalDetailsForm.controls; }

  addEducationalDetails() {
    if (!this.editData) {
      if (this.educationalDetailsForm.valid) {
        this.educationalDetail = this.educationalDetailsForm.value;
        this.educationalDetail.startedDate = this.datepipe.transform(this.educationalDetailsForm.controls['startedDate'].value, 'yyyy-MM-dd')!
        this.educationalDetail.endDate = this.datepipe.transform(this.educationalDetailsForm.controls['endDate'].value, 'yyyy-MM-dd')!
        this.educationalDetailsService.addEducationalDetailToList(this.educationalDetail).subscribe(
          (response) => {
            this.educationalDetailsForm.reset();
            this.dialogRef.close();
          }
        )
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please fill all required fields'
        })
      }
    } else {
      this.updateEducationalDetail();
    }
  }

  updateEducationalDetail() {
    this.educationalDetail = this.educationalDetailsForm.value;
    this.educationalDetail.id = this.editData.id;
    this.educationalDetail.startedDate = this.datepipe.transform(this.educationalDetailsForm.controls['startedDate'].value, 'yyyy-MM-dd')!
    this.educationalDetail.endDate = this.datepipe.transform(this.educationalDetailsForm.controls['endDate'].value, 'yyyy-MM-dd')!
    this.educationalDetailsService.updateEducationalDetail(this.educationalDetail).subscribe(
      (response) => {
        this.educationalDetailsForm.reset();
        this.dialogRef.close();
      }
    )
  }

}
