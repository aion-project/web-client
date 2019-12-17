import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../model/Resource';
import { Subject } from '../model/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  static SUBJECT_URL = AppConfig.BASE_URL + "/subjects/";

  constructor(
    private http: HttpClient
  ) { }

  get(subjectId: String): Observable<Subject> {
    return this.http.get(SubjectService.SUBJECT_URL + subjectId).pipe(map(this.toSubject))
  }

  getAll(): Observable<Subject[]> {
    return this.http.get(SubjectService.SUBJECT_URL).pipe(map((res: any[]) => res.map(this.toSubject)))
  }

  create(name: String, description: String) {
    let data = {
      name: name,
      description: description,
    }
    return this.http.post(SubjectService.SUBJECT_URL, data)
  }

  update(resourceId: String, name: String,description: String) {
    let data = {
      name: name,
      description: description,
    }
    return this.http.put(SubjectService.SUBJECT_URL + resourceId, data)
  }

  delete(resourceId: String) {
    return this.http.delete(SubjectService.SUBJECT_URL + resourceId)
  }

  private toSubject = res => res as Subject
}
