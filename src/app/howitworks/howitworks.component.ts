import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MissionService } from '../app.service';
import { HomeService } from '../home/home.service';
import { Meta } from '@angular/platform-browser';
import { LanguageService } from '../app.language';

declare var $: any;

@Component({
  selector: 'howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.css']
})
export class HowitworksComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _meta: Meta,
    private _router: Router,
    private homeService: HomeService,
    private _lang: LanguageService) { }

  headerOpen: string;
  succesSeller = false;
  sellEmail: string;
  sellPhone: string;
  email_Error = false;
  phone_Error = false;
  registerSave = false;
  PEerror: any;
  howPopupSuccess = false;
  listSell: any;
  data: any;
  howItWorks: any

  ngOnInit() {

    // this.howItWorks = this._lang.engHowItWorks;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1: this.howItWorks = this._lang.engHowItWorks1;
                          break;

        case 2:  this.howItWorks = this._lang.engHowItWorks;
                break;
      }
    }
    else{
      this.howItWorks = this._lang.engHowItWorks;
    }


    this.seo();
    $(window).on('popstate', function () {
      $('.modal').modal('hide');
    });
    this._missionService.confirmheaderOpen(this.headerOpen);
  }

  seo() {
    let list = {
      type: 3
    }
    this.homeService.seoList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.data = res.data;
          // console.log("desc", data.description);
          if (this.data) {
            this._meta.addTag({ name: 'title', content: this.data.title })
            this._meta.addTag({ name: 'description', content: this.data.description })
            this._meta.addTag({ name: 'keywords', content: this.data.keyword.toString() })
          }
        }
      });
  }

  emailValidation(value) {
    this.PEerror = false;
    if (value.length > 5) {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(value)) {
        this.email_Error = false;
        this.registerSave = true;
      } else {
        this.email_Error = true;
        this.registerSave = false;
      }
    } else {
      this.email_Error = false;
    }
  }

  mobileValidation(value) {
    this.PEerror = false;
    if (value.length > 5) {
      var regexPhone = /^(\+91-|\+91|0)?\d{10}$/;
      if (value.match(regexPhone)) {
        this.phone_Error = false;
        this.registerSave = true;
      } else {
        var val = value.replace(/([^+0-9]+)/gi, '')
        this.sellPhone = val;
        this.phone_Error = true;
        this.registerSave = false;
      }
      if (value.length == 10) {
        this.phone_Error = true;
        this.registerSave = false;
      }
    } else {
      this.phone_Error = false;
    }
  }

  sellHowSend() {
    console.log(this.sellEmail, this.sellPhone);
    if (this.sellEmail && this.sellPhone) {
      this.howPopupSuccess = false;
      this.phone_Error = false;
      this.email_Error = false;
      this.PEerror = "Please try anyone";
      setTimeout(() => {
        this.PEerror = false;
      }, 3000);
    } else if (this.sellEmail || this.sellPhone) {
      if (this.sellEmail) {
        this.sellSend(1);
      } else {
        this.sellSend(2);
      }
      this.PEerror = false;
    }
  }

  emptySell() {
    this.sellPhone = "";
    this.sellEmail = "";
    this.email_Error = false;
    this.phone_Error = false;
  }

  sellSend(val) {
    this.email_Error = false;
    this.phone_Error = false;
    if (val == 1) {
      this.listSell = {
        type: "1",
        emailId: this.sellEmail
      }
    } else {
      this.listSell = {
        type: "2",
        phoneNumber: this.sellPhone
      }
    }
    // console.log(this.listSell);
    this.homeService.sellList(this.listSell)
      .subscribe((res) => {
        if (res.code == 200) {
          this.howPopupSuccess = true;
          this.emptySell();
        } else {
          this.PEerror = res.message;
        }
      });
  }

}
