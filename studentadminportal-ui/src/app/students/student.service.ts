import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../Models/api-models/add-student-request.model';
import { Student } from '../Models/api-models/student.model';
import { UpdateStudentRequest } from '../Models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {  }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseApiUrl}/students`);
  }

  getStudent(studentId: string): Observable<Student>{
    return this.httpClient.get<Student>(`${this.baseApiUrl}/students/${studentId}`);
  }

  //Observable<Student> -> Observable<any>
  updateStudent(studentId: string, studentRequest: Student): Observable<any>{
    const updateStudentRerquest : UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.put(`${this.baseApiUrl}/students/${studentId}`, updateStudentRerquest);

  }

  deleteStudent(studentId: string): Observable<Student>{
    return this.httpClient.delete<Student>(`${this.baseApiUrl}/students/${studentId}`);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + '/students/add', addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file);

    return this.httpClient.post(this.baseApiUrl + '/students/' + studentId + '/upload-image',
      formData, {
      responseType: 'text'
    }
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }

}


