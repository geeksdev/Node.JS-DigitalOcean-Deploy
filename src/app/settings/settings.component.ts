import { Component, OnInit, NgZone,Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MissionService } from '../app.service';
import { SettingsService } from './settings.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { EventEmitter } from 'events';

declare var $: any;
declare var google: any;
declare var FB: any;

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // @Output() public UserName  = new EventEmitter();
  // @Input()  public editUserName:string = "";
  headerOpen: string;
  headerRefresh: string;
  token: any;
  userName: any;
  email: any;
  profilePicUrl: any;
  phone_Error = false;
  email_Error = false;
  registerSave = false;
  editData: any;
  errorMsg: any;
  loaderButton = true;
  cloudinaryImage: any;
  follow_count = 0;
  cloudinaryOptions: CloudinaryOptions = new CloudinaryOptions({
    cloudName: 'yeloadmin',
    uploadPreset: 'iirvrtog',
    autoUpload: true
  });

  uploader: CloudinaryUploader = new CloudinaryUploader(this.cloudinaryOptions);

  constructor(
    private _missionService: MissionService,
    private _conf: Configuration,
    private _router: Router,
    private _zone: NgZone,
    private _service: SettingsService,
    public _auth: AuthService,
    private _lang: LanguageService) {

    _missionService.missionheaderRefresh$.subscribe(
      headerRefresh => {
        this.ngOnInit();
      });
  }


  sellingOffer: any;
  offset = 0;
  limit = 40;
  internetModal = false;


  buyingOffer: any;
  loginUsername: any;
  watchOffer: any;


  offerListLength = false;
  allListProfile = false;
  following: any;
  followingErr: any;
  followerLength: any;
  followingLength: any;
  postLength: any;
  tileFollowers: any;
  loaderButtonPopup = false;
  loaderButtonProfile = false;
  settings: any;
  emptyStar = [];
  sub: any;
  payPal = "https://www.paypal.me/";






  ngOnInit() {

    // this.settings = this._lang.engSettings;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1: this.settings = this._lang.engSettings1;
                          break;

        case 2:  this.settings = this._lang.engSettings;
                break;
      }
    }
    else{
      this.settings = this._lang.engSettings;
    }


    $(window).on('popstate', function () {
      $('.modal').modal('hide');
    });

    this._missionService.confirmheaderOpen(this.headerOpen);
    this.token = this._conf.getItem('authToken');
    if (!this.token) {
      this._router.navigate([""]);
    }

    this.userName = this._conf.getItem('username');
    this.email = this._conf.getItem('email');
    this.profilePicUrl = this._conf.getItem('profilePicUrl');

    setTimeout(() => {
      this.allListProfile = true;
    }, 500);
    this.allListProcess(0);
    this.getFollowing();
    this.myeditProfile();
    this.getFollowers();
    this.emptyFields();

    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      let lati = place.geometry.location.lat();
      let lngi = place.geometry.location.lng();
      var place = $(".place").val(place.formatted_address);
      var lat = $(".lat").val(lati);
      var lng = $(".lng").val(lngi);
    });

    $("#mobileSignin").intlTelInput({
      nationalMode: true,
      separateDialCode: true,
      initialCountry: "il",
      preferredCountries:["il"],
      onlyCountries: ["ca","us","gb","cy","fr","il"],
      autoPlaceholder: false,
      // modify the auto placeholder
      customPlaceholder: null,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js"
    });
  }

  public emptyStars = [
    { star: false },
    { star: false },
    { star: false },
    { star: false },
    { star: false }
  ]

  emptyFields() {
    this.emptyStar = [];
    for (var i = 0; i < this.emptyStars.length; i++) {
      this.emptyStar.push(this.emptyStars[i]);
    }
    // console.log(this.emptyStar)
  }

  starActive(val: number) {
    for (var i = 0; i < val; i++) {
      this.emptyStar[i].star = true;
    }
    // console.log(this.emptyStar)
  }

  allListProcess(val) {
    let list = {
      token: this.token,
      offset: this.offset,
      limit: this.limit
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 3000);
    this._service.sellingPostList(list, val)
      .subscribe((res) => {
        if (res.code == 200) {
          this.loaderButton = false;
          this.sellingOffer = res.data;
          if (res.data && res.data.length > 0) {
            this.offerListLength = true;
            this.postLength = res.data.length;
          } else {
            this.offerListLength = false;
            this.postLength = 0;
          }
        } else {
          this.offerListLength = false;
          this.postLength = 0;
          this.loaderButton = false;
        }
      });

  }

  buildTrusts() {
    $("#buildTrustPopup").modal("show");
  }

  getFollowers() {
    let list = {
      token: this.token,
      offset: this.offset,
      limit: this.limit
    }
    this.tileFollowers = "Follower";
    this.following = [];
    this.loaderButtonPopup = true;
    setTimeout(() => {
      this.loaderButtonPopup = false;
    }, 3000);
    this._service.followerPostList(list)
      .subscribe((res) => {
        this.loaderButtonPopup = false;
        if (res.code == 200) {
          this.followingErr = false;
          this.following = res.followers;
          if (res.followers && res.followers.length) {
            this.followerLength = res.followers.length;
          } else {
            this.followerLength = 0;
          }
        } else {
          this.followerLength = 0;
          this.followingErr = res.message;
        }
      });

  }


  getFollowing() {
    let list = {
      token: this.token,
      offset: this.offset,
      limit: this.limit
    }
    this.tileFollowers = "Following";
    this.following = [];
    this.loaderButtonPopup = true;
    setTimeout(() => {
      this.loaderButtonPopup = false;
    }, 3000);
    this._service.followingPostList(list)
      .subscribe((res) => {
        this.loaderButtonPopup = false;
        if (res.code == 200) {
          this._conf.setItem('authToken', res.token);
          this.token = this._conf.getItem('authToken');
          this.followingErr = false;
          this.following = res.result;
          if (res.result && res.result.length) {
            this.followingLength = res.result.length;
          } else {
            this.followingLength = 0;
          }
        } else {
          this.followingLength = 0;
          this.followingErr = res.message;
        }
      });
  }


  followerButton(val, i) {
    if (this.token) {
      let list = {
        token: this.token,
        userNameToFollow: val
      }
      this.following[i].loaderFlag = true;
      setTimeout(() => {
        this.following[i].loaderFlag = false;
      }, 3000);
      this.following[i].userFollowRequestStatus = 1;
      this._service.followersPostListButton(list)
        .subscribe((res) => {
          this.following[i].loaderFlag = false;

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
      this.following[i].loaderFlag = true;
      setTimeout(() => {
        this.following[i].loaderFlag = false;
      }, 3000);
      this.following[i].userFollowRequestStatus = null;
      this._service.unfollowPostListButton(list)
        .subscribe((res) => {
          this.following[i].loaderFlag = false;
        });
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }
  }



  editProfile = {
    profilePicUrl: '',
    fullName: '',
    username: '',
    bio: '',
    websiteUrl: '',
    email: '',
    phoneNumber: '',
    place: '',
    latitude: '',
    longitude: '',
    facebookVerified: '',
    googleVerified: '',
    paypalUrl: ''
  }

  myeditProfile() {
    let list = {
      token: this.token,
    }
    this.errorMsg = false;
    this._service.editProfile(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.editProfile = res.data;
          if (res.data.avgRating) {
            this.starActive(res.data.avgRating);
          }
        } else {
          this.errorMsg = res.message;
        }
      });
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.saveProfile();
    }
  }


  saveProfile() {
    let flag = $("#mobileSignin").intlTelInput("getSelectedCountryData");
    var place = $("#location").val();
    var lat = $(".lat").val();
    var lng = $(".lng").val();
    var image = $(".settingImg").attr("src");
    if (image != '../assets/images/default-thumnail.png') {
      console.log("not image", image);
      this.editProfile.profilePicUrl = image;
    }
    this.editProfile.place = place;
    this.editProfile.latitude = lat;
    this.editProfile.longitude = lng;
    
    console.log("the place for edit profile :",this.editProfile.place )
    if (this.editProfile.phoneNumber.charAt(0) != '+') {
      this.editProfile.phoneNumber = "+" + flag.dialCode + this.editProfile.phoneNumber;
    }
    this.loaderButtonProfile = true;
    setTimeout(() => {
      this.loaderButtonProfile = false;
    }, 3000);
    this._service.saveProfilePost(this.editProfile)
      .subscribe((res) => {
        console.log("the res for userName changes :",res);
        if (res.code == 200) {
          this.loaderButtonProfile = false;
          this._conf.setItem('authToken', res.token);
          this.token =  this._conf.getItem('authToken');
          this._conf.setItem('profilePicUrl', image);
          this._conf.setItem('username', this.editProfile.username);
          this.userName = this.editProfile.username;
          // this.UserName.emit(this.editProfile.username);
          // this.editData = res.data; 
          $("#location").val(this.editProfile.place)
          this.errorMsg = "Success";
          this._missionService.confirmheaderRefresh(this.headerRefresh);
          setTimeout(() => {
            console.log("the modal dismiss ")
            // $("#location").val(this.editProfile.place)
            this.errorMsg = false;
            $(".modal").modal("hide");
          }, 3000);
        } else {
          this.errorMsg = res.message;
          if(res.status == 401){
            this._missionService.confirmLogin(this.headerOpen);
          }
          setTimeout(() => {
            this.errorMsg = false;
          }, 3000);
        }
      });
  }

  fileUploader() {
    this.errorMsg = false;
    $(".imgCloudinary").show();
    this.uploader.uploadAll();
    setTimeout(() => {
      this.uploader.onSuccessItem = function (item: any, response: any, status: number, headers: any) {
        this.cloudinaryImage = JSON.parse(response);
        $(".settingImg").attr("src", this.cloudinaryImage.url);
        $(".imgCloudinary").hide();
        console.log(this.cloudinaryImage.url);
        return { item, response, status, headers };
      };
    }, 200);
  }

  changePassword() {
    $(".modal").modal("hide");
    this._router.navigate(['./password']);
  }

  emailClick() {
    this._router.navigate(['./emailVerify']);
  }

  itemDetails(postId) {
    this._router.navigate(["./item", postId]);
  }


  // onFacebookLoginClick() {
  //   this.sub = this._auth.login("facebook").subscribe(
  //     (result) => {
  //       // console.log(result);
  //       this.me();
  //     }
  //   )
  // }
  signInWithGoogle(): void {
    this._auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => 
      {
        console.log("the google user",x);
        this.onSuccess();
      });
    // this._auth.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.onGoogle();
  }

  signInWithFB(): void {
    this._auth.signIn(FacebookLoginProvider.PROVIDER_ID).then(x =>
       {
         console.log("the facebook user ",x); 
         this.me();
        });
    // this._auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  me() {
    FB.api('/me?fields=id,picture,name,first_name,email,gender',
      (result: any) => {
        this.facebookVerify();
      })
  }

  facebookVerify() {
    FB.getLoginStatus((response: any) => {
      if (response) {
        var accessToken = response.authResponse.accessToken;
        // console.log("test", accessToken);
        let list = {
          token: this.token,
          accessToken: accessToken
        }
        this._service.facebookPost(list)
          .subscribe((res) => {
            if (res.code == 200) {
              this.editProfile.facebookVerified == "1";
              var currentLocation = window.location;             
              this._conf.setItem("pathname", currentLocation.pathname);
              $(".modal").modal("hide");
              window.location.replace('');  
            } else {
              $("#verified").modal("show");
              $(".errorMsgs").text(res.message);
            }
          });
      }
    });
  }

  // onGoogleLoginClick() {
  //   this.sub = this._auth.login("google").subscribe(
  //     (googleUser) => {
  //       console.log(googleUser);
  //       this.onSuccess(googleUser);
  //     }
  //   )
  // }

  onSuccess () {
      // let list = {
      //   googleId: googleUser.uid,
      //   accessToken: googleUser.idToken,
      //   token: this.token,
      // }
      this._auth.authState.subscribe((user) => {
        var googleUser = user;
        console.log("test", user);
        if (user && user.provider == 'GOOGLE') {
          this._zone.run(() => {
            let list = {
              googleId: googleUser.id,
              email: googleUser.email,
              accessToken: googleUser.idToken,
              token: this.token,
        }
        this._service.googlePost(list)
        .subscribe((res) => {
          if (res.code == 200) {
            this.editProfile.googleVerified == "1";
            var currentLocation = window.location;
            this._conf.setItem("pathname", currentLocation.pathname);
            this._router.navigate(['']);
          } else {
            $("#verified").modal("show");
            $(".errorMsgs").text(res.message);
          }
        });
      });
    }
  });
}
    

  payPalList() {
    let list = {
      paypalUrl: this.payPal,
      token: this.token,
    }
    this.loaderButtonProfile = true;
    this._service.paypalPost(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.editProfile.paypalUrl == "1";
          $(".modal").modal("hide");
          this.loaderButtonProfile = false;
        }
      });
  }

}


