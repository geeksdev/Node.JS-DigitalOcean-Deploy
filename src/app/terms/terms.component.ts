import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { TermsService } from './terms.service';
import { Configuration } from '../app.constants';
import { Meta } from '@angular/platform-browser';
import { HomeService } from '../home/home.service';
import { LanguageService } from '../app.language';

@Component({
  selector: 'terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(
    private _missionService: MissionService, 
    private _serviceHome: HomeService, 
    private _meta: Meta, 
    private _conf: Configuration, 
    private _router: Router, 
    private _service: TermsService,
    private _lang: LanguageService) { }

  headerOpen: string;
  token:any;
  type = 1;
  terms:any;
  data:any;
  termsSub: any;

  ngOnInit() {

    // this.termsSub = this._lang.engTerms;
    let selectedLang  = Number(sessionStorage.get("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1:  this.termsSub = this._lang.engTerms1;
                          break;

        case 2:  this.termsSub = this._lang.engTerms;
                break;
      }
    }
    else{
      this.termsSub = this._lang.engTerms;
    }   
  

    this.seo();
    this._missionService.confirmheaderOpen(this.headerOpen);
    this.token = this._conf.getItem('authToken');
    this.termsList();
  }

  seo() {
    let list = {
      type: 5
    }
    this._serviceHome.seoList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.data = res.data;
          // console.log("desc", data.description);
          this._meta.addTag({ name: 'title', content: this.data.title })
          this._meta.addTag({ name: 'description', content: this.data.description })
          this._meta.addTag({ name: 'keywords', content: this.data.keyword.toString() })
        }
      });
  }

  termsList(){  
    
    this._service.webContent(this.token, this.type)
      .subscribe((res) => {
        if (res.code == 200) {
          this.terms = res.data[0].configData;
        }
      });
  }

}
