import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MissionService } from '../app.service';
import { Meta } from '@angular/platform-browser';
import { HomeService } from '../home/home.service';
import { LanguageService } from '../app.language';

@Component({
  selector: 'trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.css']
})
export class TrustComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _serviceHome: HomeService,
    private _meta: Meta,
    private _router: Router,
    private _lang: LanguageService) { }

  headerOpen: string;
  trust: any;

  ngOnInit() {

    // this.trust = this._lang.engTrust;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1: this.trust = this._lang.engTrust1;
                          break;

        case 2:  this.trust = this._lang.engTrust;
                break;
      }
    }
    else{
      this.trust = this._lang.engTrust;
    }


    // this.seo();
    this._meta.addTag({ name: 'title', content: 'Saftey Tips | Free Of Spams | Free Of Scams' })
    this._meta.addTag({ name: 'description', content: 'Our goal is to keep MobiVenta 100% free of scams and spam, and we appreciate your cooperation with this!' })
    this._missionService.confirmheaderOpen(this.headerOpen);
  }

  seo() {
    let list = {
      type: 4
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

}
