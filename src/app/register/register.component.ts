import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employeemodel } from './register.model';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formvalue !: FormGroup;
  employeemodelObj : Employeemodel = new Employeemodel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  url : any;
  msg ="";
  myAlert!: true;
  
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }
 
  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstname : [''],
      lastname: [''],
      phoneno:[''],
      email:[''],
      password:['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
    postEmployeeDetails(){
      this.employeemodelObj.firstname = this.formvalue.value.firstname;
      this.employeemodelObj.lastname = this.formvalue.value.lastname;
      this.employeemodelObj.phoneno = this.formvalue.value.phoneno;
      this.employeemodelObj.email = this.formvalue.value.email;
      this.employeemodelObj.password = this.formvalue.value.password;

      this.api.postEmployee(this.employeemodelObj)
       .subscribe(res=>{
         console.log(res);
         let ref = document.getElementById('cancel')
         ref?.click();
         this.formvalue.reset();
         this.getAllEmployee();
       },
       err=>{
       })
    }
    getAllEmployee(){
      this.api.getEmployee()
      .subscribe(res=>{
        this.employeeData = res;
      })
    }
    deleteEmployee(row : any){
      this.api.deleteEmployee(row.id)
      .subscribe(res=>{
        this.getAllEmployee();
      })
    }
    onEdit(row: any){
      this.showAdd = false;
      this.showUpdate = true;
      this.employeemodelObj.id = row.id;
      this.formvalue.controls['firstname'].setValue(row.firstname);
      this.formvalue.controls['lastname'].setValue(row.lastname)  
      this.formvalue.controls['phoneno'].setValue(row.phoneno)
      this.formvalue.controls['email'].setValue(row.email)
      this.formvalue.controls['password'].setValue(row.password)
    }
    updateEmployeeDetails(){
      this.employeemodelObj.firstname = this.formvalue.value.firstname;
      this.employeemodelObj.lastname = this.formvalue.value.lastname;
      this.employeemodelObj.phoneno = this.formvalue.value.phoneno;
      this.employeemodelObj.email = this.formvalue.value.email;
      this.employeemodelObj.password = this.formvalue.value.password;
    
      this.api.updateEmployee(this.employeemodelObj,this.employeemodelObj.id)
      .subscribe(res=>{
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.getAllEmployee(); 
      })
    }
    selectFile(event : any)
    {
      if(!event.target.files[0] || event.target.files[0].length==0)
      {
        this.msg='You must select an image';
        return;
      }
      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/*/)==null){
        this.msg="Only images are Support";
        return;
      }
  
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
  
      reader.onload = (_event) => {
        this.msg="";
        this.url = reader.result;
      }
       
    }
}





