import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { HomeService } from '../home/home.service';
import { LanguageService } from '../app.language';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _router: Router, 
    private _missionService: MissionService,  
    private _service: HomeService,
    private _lang: LanguageService) { }

  headerClosed: string;
  allList:any;
  catList:any;
  logout:any

  ngOnInit() {

    this.logout = this._lang.engLogout;

    this._missionService.confirmheaderClosed(this.headerClosed);
    // this._router.navigate([""]);
    this.listGetCategories();

     let list = {
      offset: 0,
      limit: 40
    }
    this._service.homeAllList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.allList = res.data;          
          console.log('length', this.allList.length);
        }
      });
  }

  listGetCategories() {
    this._service.getCategoriesList()
      .subscribe((res) => {
        if (res.code == 200) {
          this.catList = res.data;
        }
      });
  }

}
