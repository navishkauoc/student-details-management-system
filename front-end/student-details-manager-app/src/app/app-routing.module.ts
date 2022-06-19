import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './component/student-details/student-details.component';
import { StudentListComponent } from './component/student-list/student-list.component';

const routes: Routes = [
  { path: '', component: StudentListComponent, data: { title: 'Student List' } },
  { path: 'new-student', component: StudentDetailsComponent, data: { title: 'Add New Student' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
