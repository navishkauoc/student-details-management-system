import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { StudentService } from './service/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-details-manager-app';

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'parentName', 'action'];
  dataSource : MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

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
