import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userCredentials:any = {
    "accountId": "",
    "pswd": ""
  }
  constructor(private router:Router, private apiService:ApiService, private toastr:ToastrService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }

  login = () => {
    if(this.userCredentials.accountId==="" || this.userCredentials.pswd===""){
      this.toastr.error("Username or password can not be empty!");
      return;
    }
    this.spinner.show();
    this.apiService.auth(this.userCredentials).subscribe((res:any)=>{
      if(res.error_message){ //error case
        this.toastr.error(res.error_message || "Sorry, wrong credentials or something went wrong! Try again.");
      }else{ //success case
        this.toastr.success("Logged in successfully!");
        console.log('login',res);
        this.navigate();
      }
      this.spinner.hide();
    },(err)=>{
      console.log("Error",err);
      this.spinner.hide();
      this.toastr.error(err.error.error_message || "Sorry, wrong credentials or something went wrong! Try again.");
    })
  }

  navigate = () => {
    this.router.navigate(["user-info"]);
  }

}
