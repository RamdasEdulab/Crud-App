import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";




@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetEmployeeForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeForm: FormGroup;
  
  DepartmentsArray: any = ['Technical', 'Non-Technical', 'Finance'];

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private employeeApi: ApiService) {var id = this.actRoute.snapshot.paramMap.get('id');
    this.employeeApi.GetEmployee(id).subscribe(data => {
      this.employeeForm = this.fb.group({
        employee_name: [data.employee_name, [Validators.required]],
        employee_email: [data.employee_email, [Validators.required]],
        department: [data.department, [Validators.required]],
        dob: [data.dob, [Validators.required]],
        gender: [data.gender]
      })      
    })        
  } 

  ngOnInit() {
    this.updateemployeeForm();
  }
  updateemployeeForm() {
    this.employeeForm = this.fb.group({
      employee_name: ['', [Validators.required]],
      employee_email: ['', [Validators.required]],
      department: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  
  
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.employeeForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  
  public handleError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

 
  updateEmployeeForm() {
    console.log(this.employeeForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.employeeApi.UpdateEmployee(id, this.employeeForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      });
    }
  }
  
}