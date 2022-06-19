import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/student';

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/list');
  }

  saveStudent(student: Student): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/add', student);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  updateStudent(id: number, student: Student): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/update/' + id, student);
  }
}
