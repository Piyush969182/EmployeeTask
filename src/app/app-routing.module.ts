import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ExperienceComponent } from './experience/experience.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
