import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { TermsService } from '../terms/terms.service';
import { Configuration } from '../app.constants';
import { Meta } from '@angular/platform-browser';
import { HomeService } from '../home/home.service';
import { LanguageService } from '../app.language';

declare var $: any;

@Component({
  selector: 'needhelp',
  templateUrl: './needhelp.component.html',
  styleUrls: ['./needhelp.component.css']
})
export class NeedhelpComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _serviceHome: HomeService,
    private _meta: Meta,
    private _conf: Configuration,
    private _router: Router,
    private _service: TermsService,
    private _lang: LanguageService) { }

  headerHelpClose: string;
  token: any;
  helpCat: any;
  faqCat: any;
  faqCatPoints: any;
  topicContent = false;
  titleName: any;
  topicName: any;
  helpSearchCat: any;
  cancelButton = false;
  pointsLength = false;
  listQues: any;
  listQuesDrop = false;
  topicChild = false;
  topiclistAns: any;
  faqPoints: any = [];
  faqPoints1: any = [];
  type = 4;
  terms: any;
  needHelp: any;

  ngOnInit() {

    // this.needHelp = this._lang.engneedHelp;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1:  this.needHelp = this._lang.engneedHelp1;
                          break;

        case 2:  this.needHelp = this._lang.engneedHelp;
                break;
      }
    }
    else{
      this.needHelp = this._lang.engneedHelp;
    }

    // this.seo();
    this._missionService.confirmheaderHelpClose(this.headerHelpClose);
    this.token = this._conf.getItem('authToken');
    this.termsList();
    // this.faqCatList();
  }

  seo() {
    let list = {
      type: 5
    }
    this._serviceHome.seoList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          let data = res.data;
          if (data) {
            // console.log("desc", data.description);
            this._meta.addTag({ name: 'title', content: data.title })
            this._meta.addTag({ name: 'description', content: data.description })
            this._meta.addTag({ name: 'keywords', content: data.keyword.toString() })
          }
        }
      });
  }

  termsList() {

    this._service.webContent(this.token, this.type)
      .subscribe((res) => {
        if (res.code == 200) {
          this.terms = res.data[0].configData;
        } else {
          this.terms = res.message;
        }
      });
  }

  // searchListCat(val) {
  //   if (val.length > 0) {
  //     this.cancelButton = true;
  //     this.listQuesDrop = false;
  //     this._service.searchCatPoints(val)
  //       .subscribe((res) => {
  //         if (res.code == 200) {
  //           this.helpSearchCat = res.data[0].points;
  //           if (this.helpSearchCat && this.helpSearchCat.length > 0) {
  //             this.pointsLength = true;
  //           } else {
  //             this.pointsLength = false;
  //           }
  //         }
  //       });
  //   } else {
  //     this.emptyText();
  //   }
  // }

  // dropQues(val) {
  //   this.listQuesDrop = true;
  //   this.pointsLength = false;
  //   this.listQues = val;
  // }

  // emptyText() {
  //   this.listQuesDrop = false;
  //   this.cancelButton = false;
  //   this.pointsLength = false;
  //   $(".helpInput").val("");
  // }

  // termsList() {
  //   this._service.helpCategoryContent(this.token)
  //     .subscribe((res) => {
  //       if (res.code == 200) {
  //         this.helpCat = res.data;
  //       }
  //     });
  // }

  // faqCatList() {
  //   this._service.faqCatPoints()
  //     .subscribe((res) => {
  //       if (res.code == 200) {
  //         let faqPoint = res.data;
  //         let stLength = Math.round(faqPoint.length / 2);
  //         // let ltLength = faqPoint.length - stLength
  //         // console.log(stLength, ltLength);
  //         for (var i = 0; i < faqPoint.length; i++) {
  //           if (faqPoint[i]['points']) {
  //             this.faqPoints.push(faqPoint[i]);
  //           }
  //         }
  //         // for (var i = stLength; i < faqPoint.length; i++) {
  //         //   if (faqPoint[i]['points']) {
  //         //     this.faqPoints1.push(faqPoint[i]);
  //         //   }
  //         // }
  //       }
  //     });
  // }
  // catSelectid(catId, topicAns) {
  //   this.catSelect(catId);
  //   setTimeout(() => {
  //     this.topicChild = true;
  //     this.topiclistAns = topicAns;
  //   }, 500);
  // }

  // topicChildList(val) {
  //   // console.log(val);
  //   this.topicChild = true;
  //   this.topiclistAns = val;
  // }

  // catSelect(catId) {
  //   this._service.faqCategoryContent(this.token, catId)
  //     .subscribe((res) => {
  //       if (res.code == 200) {
  //         this.faqCat = res.data;
  //         this.titleName = this.faqCat[0].faqCategory;
  //         this.topicName = this.faqCat[0].topicName;
  //         this.catSelectPoints(this.faqCat[0].topicId, 0);
  //       }
  //     });
  // }

  // catSelectPoints(topicId, i) {
  //   $(".catSideName").removeClass("active");
  //   $("#" + "content" + i).addClass("active");
  //   this.topicName = this.faqCat[i].topicName;
  //   this.topicChild = false;
  //   this._service.faqCategoryPoints(this.token, topicId)
  //     .subscribe((res) => {
  //       if (res.code == 200) {
  //         this.topicContent = true;
  //         this.faqCatPoints = res.data[0].points;
  //       }
  //     });
  // }

  // arrowList(val) {
  //   if (!$("#" + 'a' + val).hasClass("open")) {
  //     $(".listDetailsneed").removeClass("open");
  //   }
  //   $("#" + 'a' + val).toggleClass("open");
  // }

  // arrowList1(val) {
  //   if (!$("#" + 'b' + val).hasClass("open")) {
  //     $(".listDetailsneed").removeClass("open");
  //   }
  //   $("#" + 'b' + val).toggleClass("open");
  // }


  // topicChildList1() {
  //   this.topicChild = false;
  // }
  // HometopicChildList() {
  //   this.topicContent = false;
  // }

}
