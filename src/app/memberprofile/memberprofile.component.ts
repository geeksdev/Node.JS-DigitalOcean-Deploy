import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../app.service';
import { MemberProfileService } from './memberprofile.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';

declare var $: any;
declare var google: any;
@Component({
  selector: 'memberprofile',
  templateUrl: './memberprofile.component.html',
  styleUrls: ['./memberprofile.component.css']
})
export class MemberprofileComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _conf: Configuration,
    private route: ActivatedRoute,
    private _router: Router,
    private _service: MemberProfileService,
    private _lang: LanguageService) { }
  headerOpen: string;
  membername: any;
  allListYelo = false;
  token: any;
  offset = 0;
  limit = 40;
  followers: any;
  followOpen = false;
  memberProfileData: any;
  memberList: any;
  memberListLength: any;
  loginUsername: any;
  memberProfileSub: any;

  ngOnInit() {

    this.memberProfileSub = this._lang.engMemberProfile;

    this._missionService.confirmheaderOpen(this.headerOpen);
    this.token = this._conf.getItem('authToken');
    this.loginUsername = this._conf.getItem('username');
    if (this.token) {
      this.route.params.subscribe(params => {
        this.membername = params['name'];
        let list = {
          token: this.token,
          membername: this.membername,
          offset: this.offset,
          limit: this.limit
        }
        this.allListYelo = false;
        this._service.memberProfileList(list)
          .subscribe((res) => {
            this.allListYelo = true;
            if (res.code == 200) {
              let memberList = res.memberPostsData;
              if (memberList && memberList.length > 0) {
                this.memberList = res.memberPostsData;
                this.memberListLength = true;
              } else {
                this.memberListLength = false;
              }
              this.memberProfileData = res.memberProfileData[0];
              if (this.memberProfileData.memberLatitude) {
                this.locationMap();
              }
            } else if (res.code == 206) {
              this.memberProfileData = res.memberProfileData[0];
              if (this.memberProfileData.memberLatitude) {
                this.locationMap();
              }
            } else {
              this.memberListLength = false;
            }
          }, (err) => {
            let error = JSON.parse(err._body);
            var listErr = error.code;
            if (listErr == 401) {
              this._conf.clear();
              this._missionService.confirmLogin(this.headerOpen);
            }
          });
        this.getFollowers();
      });
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }
  }

  itemDetails(id) {
    this._router.navigate(["item", id]);
  }
  memberProfile(val) {
    $(".modal").modal("hide");
    this._router.navigate(["p", val]);
  }

  followerButton(val, i) {
    if (this.token) {
      let list = {
        token: this.token,
        userNameToFollow: val
      }
      if (i == undefined) {
        this.memberProfileData.userFollowRequestStatus = 1;
      } else {
        this.followers[i].userFollowRequestStatus = 1;
      }
      this._service.followersPostList(list)
        .subscribe((res) => {

        });
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }

  }

  unFollowButton(val, i) {
    if (this.token) {
      let list = {
        token: this.token,
        unfollowUserName: val
      }
      if (i == undefined) {
        this.memberProfileData.userFollowRequestStatus = null;
      } else {
        this.followers[i].userFollowRequestStatus = null;
      }
      this._service.unfollowPostList(list)
        .subscribe((res) => {

        });
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }

  }

  getFollowers() {
    let list = {
      token: this.token,
      membername: this.membername,
      offset: 0,
      limit: 40
    }
    this._service.getFollowersPostList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.followers = res.memberFollowers;
          if (this.followers && this.followers.length > 0) {
            this.followOpen = true;
          } else {
            this.followOpen = false;
          }
        } else {
          this.followOpen = false;
        }
      });

  }


  locationMap() {
    var myLatLng = { lat: parseFloat(this.memberProfileData.memberLatitude), lng: parseFloat(this.memberProfileData.memberLongitude) };
    var mapCanvas = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 15,
      center: myLatLng,
      scrollwheel: false
    });

    setTimeout(() => {
      google.maps.event.trigger(mapCanvas, "resize");
      mapCanvas.setCenter({ lat: parseFloat(this.memberProfileData.memberLatitude), lng: parseFloat(this.memberProfileData.memberLongitude) });
    }, 300);
    var markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'rgba(167, 217, 206, 0.81)',
      fillOpacity: .9,
      scale: 50,
      strokeColor: 'rgba(167, 217, 206, 0.81)',
      strokeWeight: 1
    };
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: mapCanvas,
      icon: markerIcon
    });
  }

  popupLocation() {
    var myLatLng = { lat: parseFloat(this.memberProfileData.memberLatitude), lng: parseFloat(this.memberProfileData.memberLongitude) };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng,
      scrollwheel: false
    });
    setTimeout(() => {
      google.maps.event.trigger(map, "resize");
      map.setCenter({ lat: parseFloat(this.memberProfileData.memberLatitude), lng: parseFloat(this.memberProfileData.memberLongitude) });
    }, 300);
    var markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'rgba(167, 217, 206, 0.81)',
      fillOpacity: .9,
      scale: 50,
      strokeColor: 'rgba(167, 217, 206, 0.81)',
      strokeWeight: 1
    };
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: markerIcon
    });

  }

}
