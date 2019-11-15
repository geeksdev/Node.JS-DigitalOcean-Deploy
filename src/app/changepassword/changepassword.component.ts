import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MissionService } from '../app.service';
import { ChangePasswordService } from './changepassword.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';
@Component({
  selector: 'changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private _missionService: MissionService, 
    private _conf: Configuration, private _router: Router, 
    private _service: ChangePasswordService,
    private _lang: LanguageService) { }

  headerClosed: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  registerErrMsg: any;
  token: any;
  loaderButton = false;
  changePass:any;

  ngOnInit() {

    this.changePass = this._lang.engchangePassword;

    this._missionService.confirmheaderClosed(this.headerClosed);
    this.token = this._conf.getItem('authToken');
  }

  resetValue() {
    this.oldPassword = "";
    this.newPassword = "";
    this.confirmPassword = "";
  }

  passwordChange() {
    let list = {
      token: this.token,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 3000);
    this._service.changePassword(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.resetValue();
          this.registerErrMsg = false;
          this.registerErrMsg = res.message;
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 3000);
          this._router.navigate(["./password"]);
        } else {
          this.loaderButton = false;
          this.resetValue();
          this.registerErrMsg = res.message;
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 3000);
        }

      });
  }

}
