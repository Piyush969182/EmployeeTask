import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { Experience } from '../models/experience.model';
import { Organization } from '../models/organization.model';
import { Pagination } from '../models/pagination.model';
import { Shift } from '../models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  base_url: string = 'https://localhost:44358/api/'
  constructor(private http: HttpClient) { }
  
  addEmployee(model: Employee): Observable<any> {
    return this.http.post<any>(`${this.base_url}Employee/AddEmployee`, model);
  }
  getOrganization(): Observable<Organization> {
    return this.http.get<Organization>(`${this.base_url}Organization/Organizations`);
  }
  getDepartment(model:Pagination): Observable<any> {
    return this.http.post<any>(`${this.base_url}Department/Departments`,model);
  }
  getShift(): Observable<Shift> {
    return this.http.get<Shift>(`${this.base_url}ShiftSchedule/Shifts`);
  }
  addExperience(model: Experience): Observable<any> {
    return this.http.post<any>(`${this.base_url}Experience/AddExperience`, model);
  }
  deleteExperience(experienceId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('experienceId', experienceId);
    return this.http.delete<any>(`${this.base_url}Experience/DeleteExperience`, { params: params });
  }
}
