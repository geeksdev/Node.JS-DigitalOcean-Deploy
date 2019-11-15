import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MissionService } from '../app.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';

declare var $: any;

@Component({
  selector: 'discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {

  constructor(private _missionService: MissionService, private _conf: Configuration, private _router: Router,private _lang: LanguageService) { }

  headerOpen: string;
  token: any;
  profilePicUrl:any;
  reportUser = false;
  discussions:any;

  ngOnInit() {

    this.discussions = this._lang.engDiscussions;


    this._missionService.confirmheaderOpen(this.headerOpen);
    this.token = this._conf.getItem('authToken');
    this.profilePicUrl = this._conf.getItem('profilePicUrl');
  }

   reportItem() {
    // if (this.token) {
    //   let list = {
    //     token: this.token,
    //     reportedUser: this.itemList.membername,
    //     reason: "reason"
    //   }
    //   this._service.reportPostList(list)
    //     .subscribe((res) => {
    //       if (res.code == 200) {
    //         // this.reportList = res.data;
    //       }
    //     });
    //   $("#reportItemPopup").modal("show");
    // } else {
    //   this._router.navigate(['./login']);
    // }
  }

}
