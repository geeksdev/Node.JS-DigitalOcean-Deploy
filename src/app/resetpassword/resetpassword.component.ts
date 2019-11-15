import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { RegisterService } from '../register/register.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';
@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(
    private _missionService: MissionService, 
    private _conf: Configuration, 
    private _router: Router, 
    private _service: RegisterService,
    private _lang: LanguageService) { }

  headerClosed: string;
  email: string;
  emailList = false;
  registerErrMsg: any;
  email_Error = false;
  loaderButton = false;
  resetEmail = false;
  resetPass:any;

  ngOnInit() {

    this.resetPass = this._lang.engResetPassword;

    this._missionService.confirmheaderClosed(this.headerClosed);
    let token = this._conf.getItem('authToken');
    if (token) {
      this._router.navigate([""]);
    }
  }

  emailValidation(value) {
    if (value.length > 5) {
      this.registerErrMsg = false;
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

      if (regexEmail.test(value)) {
        this.email_Error = false;
        this.emailList = true;
      } else {
        this.email_Error = true;
        this.emailList = false;
      }
    } else {
      this.emailList = false;
    }
  }

  resetPassword() {
    let list = {
      email: this.email,
      type: '0'
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 1000);
    if (this.email) {
      this._service.resetPwd(list)
        .subscribe((res) => {
          this.loaderButton = false;
          if (res.code == 200) {
            this.email = "";
            this.registerErrMsg = res.message;
            this.resetEmail = true;
          } else {
            this.resetEmail = false;;
            this.registerErrMsg = res.message;
          }
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 3000);
        });
    } else {
      this.loaderButton = false;
      this.registerErrMsg = "field is missing";
      setTimeout(() => {
        this.registerErrMsg = false;
      }, 2000);
    }
  }

}
