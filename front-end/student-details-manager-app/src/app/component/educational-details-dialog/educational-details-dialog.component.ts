import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    private formBuilder: FormBuilder,
    private educationalDetailsService: EducationalDetailsService,
    private dialogRef: MatDialogRef<EducationalDetailsDialogComponent>,
    private datepipe: DatePipe
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
  }

  get f() { return this.educationalDetailsForm.controls; }

  addEducationalDetails() {
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
  }

}
