import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../app.service';
import { ChangePasswordService } from '../changepassword/changepassword.service';
import { LanguageService } from '../app.language';

declare var $: any;
@Component({
  selector: 'passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  constructor(
    private _missionService: MissionService, 
    private _router: Router, 
    private route: ActivatedRoute, 
    private _service: ChangePasswordService,
    private _lang: LanguageService) { }
    
  headerClosed: string;
  headerRefresh: string;
  newPassword: string;
  repeatPassword: string;
  postId: any;
  registerErrMsg: any;
  loaderButton = false;
  passwordReset: any;
  headerOpen:string;

  ngOnInit() {

    this.passwordReset = this._lang.engPasswordReset;

    this._missionService.confirmheaderClosed(this.headerClosed);
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });
  }

  resetValue() {
    this.newPassword = "";
    this.repeatPassword = "";
  }

  passwordChange() {
    let list = {
      passwordResetLink: this.postId,
      password: this.newPassword,
      repeatPassword: this.repeatPassword
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 3000);
    this._service.resetChangePassword(list)
      .subscribe((res) => {
        this.loaderButton = false;
        if (res.code == 200) {
          $(".successLink").show();
          this.resetValue();
          this.registerErrMsg = false;
          this._missionService.confirmLogin(this.headerOpen);
        } else {
          $(".successLink").hide();
          this.registerErrMsg = res.message;
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 3000);
        }
      });
  }

}
