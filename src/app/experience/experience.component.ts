import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experience!: FormGroup
  experienceArray!: FormArray;
  response: any;
  public loading = false;
  employeeId!: number;
  experienceId!: number;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private employeeServices: EmployeeService, private toastr: ToastrService) {
    this.experience = this.fb.group({
      previousCompany: ['', Validators.required],
      jobTittle: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      employeeId: [''],
    });

    this.experienceArray = new FormArray([this.fb.group({
      previousCompany: ['', Validators.required],
      jobTittle: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      employeeId: [''],
    })]);
  }

  ngOnInit(): void {
    // this.employeeId = Number(this.route.snapshot.paramMap.get('employeeId'));
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['employeeId'];
    });
  }
  addInputControl() {
    this.experienceArray.push(this.experience);
  }
  removeInputControl(idx: number) {
    this.experienceArray.removeAt(idx);
  }
  addExperience(checkButton: boolean) {
    this.loading = true;
    console.log(this.experience.value)
    this.experience.controls['employeeId'].setValue(this.employeeId);
    this.employeeServices.addExperience(this.experience.value).subscribe(s => {
      console.log(s)
      this.loading = false;
      this.response = s
      this.experienceId = this.response.lastInsertedId;
      this.addInputControl();
      // this.experience.reset();

      if (checkButton) {
        this.showSuccess(this.response.message);
        this.router.navigateByUrl('');
      }
    },
      err => {
        this.loading = false;
        this.showError()
      }
    );
  }
  get f() {
    return this.experience.controls;
  }
  DeleteExperience() {
    this.employeeServices.deleteExperience(this.experienceId).subscribe(response => {
      console.log(response)
    })
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError() {
    this.toastr.error('Something went wrong');
  }
}
