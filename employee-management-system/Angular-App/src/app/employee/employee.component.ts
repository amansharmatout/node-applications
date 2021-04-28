import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
declare var M: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  employeeService: EmployeeService;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    } else {
      this.employeeService.selectedEmployee = {
        name: '',
        _id: '',
        office: '',
        position: '',
        salary: null,
      };
    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
        this.refreshEmployeeList();
      });
    } else {
      this.employeeService.updateEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Updated Successfully', classes: 'rounded' });
        this.refreshEmployeeList();
      });
    }
  }
  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }
  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
