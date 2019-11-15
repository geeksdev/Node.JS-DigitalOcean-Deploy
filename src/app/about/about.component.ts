import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { TermsService } from '../terms/terms.service';
import { Configuration } from '../app.constants';
import { HomeService } from '../home/home.service';
import { Meta } from '@angular/platform-browser';
import { LanguageService } from '../app.language';
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

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
  type = 5;
  about: any;
  offset = 0;
  limit = 40;
  newsDetails: any;
  data: any;
  aboutUs: any;

  ngOnInit() {

    // this.aboutUs = this._lang.engAbout;
      let list =  sessionStorage.getItem("Languages");
      console.log("the language is :", list)
      if(list == '1'){
        this._router.navigate([]);
        sessionStorage.removeItem("Languages");
      }else{
        let selectedLang  = Number(sessionStorage.getItem("Language"));
        if(selectedLang){
          switch(selectedLang){
    
            case 1:  this.aboutUs = this._lang.engAbout1;
                              break;
    
            case 2:  this.aboutUs = this._lang.engAbout;
                    break;
          }
        }
        else{
          this.aboutUs = this._lang.engAbout;
        }
      }

    this.seo();
    this._missionService.confirmheaderOpen(this.headerOpen);
    this.token = this._conf.getItem('authToken');
    this.aboutList();
    this.newsList();
  }

  seo() {
    let list = {
      type: 4
    }
    this._serviceHome.seoList(list)
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

  aboutList() {
    this._service.webContent(this.token, this.type)
      .subscribe((res) => {
        if (res.code == 200) {
          this.about = res.data[0].configData;
        }
      });
  }

  newsList() {
    this._service.newsContent(this.token, this.offset, this.limit)
      .subscribe((res) => {
        if (res.code == 200) {
          this.newsDetails = res.data;
        }
      });
  }

}
