import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-details-manager-app';

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  navigateToAddNewStudent() {
    this.router.navigateByUrl('/new-student');
  }

}
