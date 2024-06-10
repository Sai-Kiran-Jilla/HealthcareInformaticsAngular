import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  sortedColumn: keyof Employee | '' = '';
  sortAscending: boolean = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.map(employee => {
        const dearnessAllowance = employee.basicSalary * 0.40;
        const conveyanceAllowance = Math.min(dearnessAllowance * 0.10, 250);
        const houseRentAllowance = Math.max(employee.basicSalary * 0.25, 1500);
        const grossSalary = employee.basicSalary + dearnessAllowance + conveyanceAllowance + houseRentAllowance;
        const pt = grossSalary <= 3000 ? 100 : grossSalary <= 6000 ? 150 : 200;
        const totalSalary = grossSalary - pt;

        return {
          ...employee,
          dearnessAllowance,
          conveyanceAllowance,
          houseRentAllowance,
          totalSalary
        };
      });
    });
  }

  sortTable(column: keyof Employee): void {
    if (this.sortedColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortedColumn = column;
      this.sortAscending = true;
    }
    this.employees.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.sortAscending ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.sortAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
