import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { EducationalDetailsDialogComponent } from '../educational-details-dialog/educational-details-dialog.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  displayedColumns: string[] = ['qualification', 'instituteName', 'startedDate', 'endDate', 'grade'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EducationalDetailsDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goBack() {
    this.router.navigateByUrl('');
  }

}
