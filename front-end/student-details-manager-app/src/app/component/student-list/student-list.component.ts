import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'parentName', 'action'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getStudentList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource(response.data.studentList)
        this.dataSource.paginator = this.paginator
      }
    )
  }

}
