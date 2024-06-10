import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      employeeCode: ['', Validators.required],
      employeeName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
  
      // Convert gender to boolean
      const employeeData = {
        ...formData,
        gender: formData.gender === 'Male' // Convert "Male" to true and "Female" to false
      };
  
      this.employeeService.addEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employee-list']);
      }, error => {
        console.error('Error adding employee:', error);
      });
    } else {
      // Highlight the form controls that have validation errors
      this.employeeForm.markAllAsTouched();
    }
  }
}
