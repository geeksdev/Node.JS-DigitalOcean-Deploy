import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { TermsService } from '../terms/terms.service';
import { Configuration } from '../app.constants';
import { Meta } from '@angular/platform-browser';
import { HomeService } from '../home/home.service';
import { LanguageService } from '../app.language';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _serviceHome: HomeService,
    private _meta: Meta,
    private _conf: Configuration,
    private _router: Router,
    private _service: TermsService,
    private _lang: LanguageService) { }

  headerOpen: string;
  token: any;
  type = 2;
  privacy: any;
  privacySub: any;

  ngOnInit() {

    // this.privacySub = this._lang.engPrivacy;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1:   this.privacySub = this._lang.engPrivacy1;
                          break;

        case 2:   this.privacySub = this._lang.engPrivacy;
                break;
      }
    }
    else{
      this.privacySub = this._lang.engPrivacy;
    }

    // this.seo();
    this._missionService.confirmheaderOpen(this.headerOpen);
    this.token = this._conf.getItem('authToken');
    this.privacyList();
  }

  seo() {
    let list = {
      type: 5
    }
    this._serviceHome.seoList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          let data = res.data;
          // console.log("desc", data.description);
          if (data) {
            this._meta.addTag({ name: 'title', content: data.title })
            this._meta.addTag({ name: 'description', content: data.description })
            this._meta.addTag({ name: 'keywords', content: data.keyword.toString() })
          }
        }
      });
  }

  privacyList() {

    this._service.webContent(this.token, this.type)
      .subscribe((res) => {
        if (res.code == 200) {
          this.privacy = res.data[0].configData;
        }
      });
  }

}
