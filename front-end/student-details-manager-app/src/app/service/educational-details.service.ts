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

  updateEducationalDetailsList(educationalDetailList: EducationalDetail[]) {
    this.educationalDetailsList = educationalDetailList;
  }

  updateEducationalDetail(educationalDetail: EducationalDetail): Observable<any> {
    this.educationalDetailsList = this.educationalDetailsList.filter(educationalDetailItem => educationalDetailItem.id !== educationalDetail.id);
    this.educationalDetailsList.push(educationalDetail);

    return of(this.educationalDetailsList);
  }

  deleteEducationalDetail(id: number): Observable<any> {
    this.educationalDetailsList = this.educationalDetailsList.filter(educationalDetailItem => educationalDetailItem.id !== id);
    return of(this.educationalDetailsList);
  }

  emptyEducationalDetailsList() {
    this.educationalDetailsList = [];
  }

}
