import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EducationalDetail } from '../model/educational-detail';

@Injectable({
  providedIn: 'root'
})
export class EducationalDetailsService {

  educationalDetailsList: EducationalDetail[] = [];

  constructor() { }

  addEducationalDetailToList(educationalDetail: EducationalDetail): Observable<any> {
    this.educationalDetailsList.push(educationalDetail);

    return of(this.educationalDetailsList);
  }

  getEducationalDetailsList(): Observable<any> {
    return of(this.educationalDetailsList);
  }

}
