import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { HomeService } from '../home/home.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _conf: Configuration,
    private _service: HomeService,
    private _router: Router,
    private _lang: LanguageService) { }

  headerOpen: string;
  headerClose: string;
  headerRefresh: string;
  catList: any;
  latlng: any;
  offer: any;
  sell: any;
  productImg:any;
  cloudinaryOptions: CloudinaryOptions = new CloudinaryOptions({
    cloudName: 'yeloadmin',
    uploadPreset: 'iirvrtog',
    autoUpload: true
  });

  uploader: CloudinaryUploader = new CloudinaryUploader(this.cloudinaryOptions);

  ngOnInit() {
    this.sell = this._lang.engSell;
    this._missionService.confirmheaderClosed(this.headerClose);
    // this.offer = this._conf.getItem('offer');
    // if (this.offer == "5") {
    //   this._missionService.confirmheaderRefresh(this.headerRefresh);
    //   this._missionService.confirmheaderClose(this.headerClose);
    // } else {
    //   this._missionService.confirmheaderOpen(this.headerOpen);
    // }
    this.latlng = JSON.parse(this._conf.getItem('latlng'));
    this.listGetCategories();
  }

  listGetCategories() {
    this._service.getCategoriesList()
      .subscribe((res) => {
        if (res.code == 200) {
          this.catList = res.data;
        }
      });
  }


  fileUploader() {    
    $(".imgCloudinary").show();
    this.uploader.uploadAll();
    setTimeout(() => {
      this.uploader.onSuccessItem = function (item: any, response: any, status: number, headers: any) {
        this.cloudinaryImage = JSON.parse(response);
        // $(".settingImg").attr("src", this.cloudinaryImage.url);
        // $(".imgCloudinary").hide();
        console.log(this.cloudinaryImage.secure_url);
        return { item, response, status, headers };
      };
    }, 200);
  }

  postList(){
    let list={
      
    }
  }




}
