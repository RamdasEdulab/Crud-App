import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetEmployeeForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeForm: FormGroup;
 
  DepartmentsArray: any = ['Technical', 'Non-Technical', 'Finance'];


  constructor( public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private employeeApi: ApiService) { }

  ngOnInit() {
    this.submitemployeeForm();
  }
    submitemployeeForm() {
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
  
   
    submitEmployeeForm() {
      if (this.employeeForm.valid) {
        this.employeeApi.AddEmployee(this.employeeForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        });
      }
    }
  
  }

