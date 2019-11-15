import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../app.service';
import { RegisterService } from '../register/register.service';
import { LanguageService } from '../app.language';

@Component({
  selector: 'verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {

  constructor(
    private _missionService: MissionService, 
    private _router: Router, 
    private route: ActivatedRoute, 
    private _service: RegisterService,
    private _lang: LanguageService) { }

  headerHelpClose: string;
  verificationToken: any;
  token: any;
  emailverify = false;
  verifyEmail: any;

  ngOnInit() {

    // this.verifyEmail = this._lang.engverifyEmail;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1: this.verifyEmail = this._lang.engverifyEmail1;
                          break;

        case 2:  this.verifyEmail = this._lang.engverifyEmail;
                break;
      }
    }
    else{
      this.verifyEmail = this._lang.engverifyEmail;
    }

    this._missionService.confirmheaderHelpClose(this.headerHelpClose);    
    
      this.route.params.subscribe(params => {
        this.token = params['id'];
        this.verificationToken = params['vtoken'];
        let list = {
          authToken : this.token,
          verificationToken: this.verificationToken
        };

        this._service.verifyEmail(list)
          .subscribe((res) => {
            if (res.code == 200) {
              this.emailverify = true;
              setTimeout(() => {
                this._router.navigate([""]);
              }, 5000);

            } else {
              this._router.navigate([""]);
            }
          });
      });
    
  }

}

