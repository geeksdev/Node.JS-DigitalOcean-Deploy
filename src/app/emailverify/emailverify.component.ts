import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MissionService } from '../app.service';
import { ChangePasswordService } from '../changepassword/changepassword.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';

@Component({
  selector: 'emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.css']
})
export class EmailverifyComponent implements OnInit {

  constructor(
    private _missionService: MissionService, 
    private _conf: Configuration, 
    private _router: Router,
    private _service: ChangePasswordService,
    private _lang: LanguageService) { }

  headerClosed: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  registerErrMsg: any;
  email_Error = false;
  registerSave = false;
  token: any;
  email:any;
  loaderButton = false;
  emailVerify:any;

  ngOnInit() {

    this.emailVerify = this._lang.engEmailVerify;

    this._missionService.confirmheaderClosed(this.headerClosed);
    this.token = this._conf.getItem('authToken');
  }


  emailChange() {
    let list = {
      token: this.token,
      email:this.email
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 3000);
    this._service.verifyEmail(list)
      .subscribe((res) => {
        if (res.code == 200) {         
          this.registerErrMsg = false;
          this.registerErrMsg = "verification email was sent";
          setTimeout(() => {
            this.registerErrMsg = false;
            this._router.navigate(["./settings"]);
          }, 3000);          
        } else {
          this.loaderButton = false;          
          this.registerErrMsg = res.message;
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 3000);
        }

      });
  }

  emailValidation(value) {
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (regexEmail.test(value)) {
      this.email_Error = false;
      this.registerSave = true;
    } else {
      this.email_Error = true;
      this.registerSave = false;
    }
  }

}
