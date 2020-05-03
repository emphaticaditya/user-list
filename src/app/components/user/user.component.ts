import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userCardData: any = [];
  selectedAge:string="";
  selectedNameLen:string="";
  allUserData: any = [];
  constructor(private toastr:ToastrService, private spinner:NgxSpinnerService, private apiService:ApiService, private router:Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers = () => {
    this.spinner.show();
    this.apiService.getUsers().subscribe((res:any)=>{
      console.log("res",res);
      this.userCardData = res;
      this.allUserData = res;
      this.spinner.hide();
    },(err)=>{
      console.log("err",err);
      if(err.status===403){
        this.toastr.error("Seems like your token has expired! You will be redirected to login page!");
        this.router.navigate([""]);
      }else{
        this.toastr.error("Something went wrong!");
      }
      this.spinner.hide();
    });
  }

  filterData = () => {
    console.log("change", this.selectedAge, this.selectedNameLen);
    this.userCardData = this.allUserData.slice();
    this.userCardData = this.returnFilteredData().slice();
  }

  returnFilteredData = () => {
    return this.userCardData.filter((eachUser:any) => {
      if(this.selectedAge==="10-20" && this.selectedNameLen===""){
        if(eachUser.age>=10 && eachUser.age<=20){
          return eachUser;
        }
      }else if(this.selectedAge==="20-30" && this.selectedNameLen===""){
        if(eachUser.age>=20 && eachUser.age<=30){
          return eachUser
        }
      }else if(this.selectedAge==="30-40" && this.selectedNameLen===""){
        if(eachUser.age>30 && eachUser.age<=40){
          return eachUser;
        }
      }else if(this.selectedAge==="40-100" && this.selectedNameLen===""){
        if(eachUser.age>=40 && eachUser.age<=100){
          return eachUser;
        }
      }else if(this.selectedNameLen==="lessThan10" && this.selectedAge===""){
        if(this.fullNameLength(eachUser.firstName,eachUser.lastName) <10){
          return eachUser;
        }
      }else if(this.selectedNameLen==="greaterThan10" && this.selectedAge===""){
        if(this.fullNameLength(eachUser.firstName,eachUser.lastName) >= 10 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <20){
          return eachUser;
        }
      }else if(this.selectedAge==="10-20" && this.selectedNameLen==="lessThan10"){
        if(eachUser.age>=10 && eachUser.age<=20 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <10){
          return eachUser;
        }
      }else if(this.selectedAge==="20-30" && this.selectedNameLen==="lessThan10"){
        if(eachUser.age>=20 && eachUser.age<=30 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <10){
          return eachUser;
        }
      }else if(this.selectedAge==="30-40" && this.selectedNameLen==="lessThan10"){
        if(eachUser.age>30 && eachUser.age<=40 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <10){
          return eachUser;
        }
      }else if(this.selectedAge==="40-100" && this.selectedNameLen==="lessThan10"){
        if(eachUser.age>=40 && eachUser.age<=100 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <10){
          return eachUser;
        }
      }else if(this.selectedAge==="10-20" && this.selectedNameLen==="greaterThan10"){
        if(eachUser.age>=10 && eachUser.age<=20 && this.fullNameLength(eachUser.firstName,eachUser.lastName) >= 10 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <20){
          return eachUser;
        }
      }else if(this.selectedAge==="20-30" && this.selectedNameLen==="greaterThan10"){
        if(eachUser.age>=20 && eachUser.age<=30 && this.fullNameLength(eachUser.firstName,eachUser.lastName) >= 10 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <20){
          return eachUser;
        }
      }else if(this.selectedAge==="30-40" && this.selectedNameLen==="greaterThan10"){
        if(eachUser.age>=30 && eachUser.age<=40 && this.fullNameLength(eachUser.firstName,eachUser.lastName) >= 10 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <20){
          return eachUser;
        }
      }else if(this.selectedAge==="40-100" && this.selectedNameLen==="greaterThan10"){
        if(eachUser.age>=40 && eachUser.age<=100 && this.fullNameLength(eachUser.firstName,eachUser.lastName) >= 10 && this.fullNameLength(eachUser.firstName,eachUser.lastName) <20){
          return eachUser;
        }
      }
    });
  }

  fullNameLength = (first:string,last:string) => {
    console.log("string leng",first.length + last.length )
    return first.length + last.length + 1;//for space in full name
  }

  resetFilter = () => {
    this.selectedAge = "";
    this.selectedNameLen = "";
    console.log('all data', this.selectedAge,this.selectedNameLen, this.userCardData, this.allUserData)
    this.userCardData = this.allUserData.slice();
  }

}
