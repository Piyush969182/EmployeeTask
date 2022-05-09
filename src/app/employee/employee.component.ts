import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee!: FormGroup
  shift!: any
  pagination!: FormGroup
  organization!: any
  department!: any
  response!: any;
  public loading = false;
  constructor(private fb: FormBuilder, private router: Router, private employeeServices: EmployeeService, private toastr: ToastrService, private _route: ActivatedRoute) {
    this.employee = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', Validators.required],
      organizationId: ['', Validators.required],
      departmentId: ['', Validators.required],
      shiftId: ['', Validators.required],
    });

    this.pagination = this.fb.group({
      pageNumber: [1, Validators.required],
      pageSize: [3, Validators.required],
    });
  }
  experienceArray = new FormArray([this.fb.group({
    previousCompany: ['', Validators.required],
    jobTittle: ['', Validators.required],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    employeeId: ['', Validators.required],
  })]);

  ngOnInit(): void {
    this.loading = true;
    this.employeeServices.getOrganization().subscribe(response => {
      console.log(response)
      this.loading = false;
      this.organization = response;
    });
    this.employeeServices.getDepartment(this.pagination.value).subscribe(response => {
      console.log(response)
      this.loading = false;
      this.department = response.items.list;
    });
    this.employeeServices.getShift().subscribe(response => {
      console.log(response)
      this.loading = false;
      this.shift = response;
    });
  }
  addInputControl() {
    this.experienceArray.push(this.fb.group({
      previousCompany: ['', Validators.required],
      jobTittle: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      employeeId: ['', Validators.required],
    }));
  }
  removeInputControl(idx: number) {
    this.experienceArray.removeAt(idx);
  }
  addEmployee() {
    this.loading = true;
    console.log(this.employee.value);
    this.employeeServices.addEmployee(this.employee.value).subscribe(s => {
      console.log(s)
      this.loading = false;
      this.response = s
      this.showSuccess(this.response.message);
      console.log(this.response.lastInsertedId)
      this.router.navigate(['experience'], {
        queryParams: {
          employeeId: this.response.lastInsertedId
        },
      });
      //this.router.navigateByUrl('experience');
    },
      err => {
        this.loading = false;
        this.showError()
      }
    );
  }
  get f() {
    return this.employee.controls;
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError() {
    this.toastr.error('Something went wrong');
  }
}
