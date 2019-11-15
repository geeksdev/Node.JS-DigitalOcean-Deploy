import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { LoginService } from './login.service';
import { Configuration } from '../app.constants';
import { HomeService } from '../home/home.service';
import { Meta } from '@angular/platform-browser';
import { LanguageService } from '../app.language';
import { AuthService } from "angular2-social-login";

declare var FB: any;
declare var $: any;
declare var gapi: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _auth: AuthService,
    private _zone: NgZone,
    private _serviceHome: HomeService,
    private _meta: Meta,
    private _missionService: MissionService,
    private _conf: Configuration,
    private _router: Router,
    private _service: LoginService,
    private _lang: LanguageService) { }

  headerClosed: string;
  headerRefresh: string;
  userName: string;
  password: string;
  registerErrMsg: any;
  loaderButton = false;
  loaderButtonfb = false;
  accessToken: any;
  profilePicUrl: any;
  fbRegister = false;
  data: any;
  loginSub: any;
  sub: any;
  LoginFb = false;

  ngOnInit() {

    this.loginSub = this._lang.engLogin;

    this.seo();
    this._missionService.confirmheaderClosed(this.headerClosed);
    // FB.init({
    //   appId: '895123320630756',
    //   cookie: false,
    //   xfbml: true,
    //   version: 'v2.7'
    // });

    let token = this._conf.getItem('authToken');
    if (token) {
      this._router.navigate([""]);
    }
    this._conf.removeItem('fbauthToken');
    this._conf.removeItem('fBregister');
  }

  seo() {
    let list = {
      type: 8
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

  ngAfterViewInit() {
    // gapi.signin2.render(
    //   'my-signin2',
    //   {
    //     "onSuccess": this.onSuccess,
    //     "scope": "profile",
    //     "theme": "dark"
    //   });

    // this.signIngoogle("google");
  }

  resetValue() {
    this.userName = "";
    this.password = "";
  }

  login() {
    let list = {
      username: this.userName,
      password: this.password,
      loginType: 1,
      pushToken: "",
      place: "",
      city: "",
      countrySname: "",
      latitude: "",
      longitude: ""
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 5000);
    if (this.userName && this.password) {
      this._service.loginYelo(list)
        .subscribe((res) => {
          // this.loaderButton = false;
          if (res.code == 200) {
            this._conf.setItem('authToken', res.token);
            this._conf.setItem('email', res.email);
            this._conf.setItem('username', res.username);
            this._conf.setItem('userId', res.userId);
            this._conf.setItem('profilePicUrl', res.profilePicUrl);
            this._conf.setItem('mqttId', res.mqttId);
            this.registerErrMsg = false;
            this.resetValue();
            this.logDevice();
            this._missionService.confirmheaderRefresh(this.headerRefresh);
            this._router.navigate([""]);
            // window.location.replace('');
          } else {
            this.loaderButton = false;
            this.registerErrMsg = res.message;
            setTimeout(() => {
              this.registerErrMsg = false;
            }, 3000);
          }
        });
    } else {
      this.loaderButton = false;
      this.registerErrMsg = "field is missing";
      setTimeout(() => {
        this.registerErrMsg = false;
      }, 2000);
    }
  }

  checkUserName(val) {
    //  this._service.usernameCheck(val)
    // .subscribe((res) => {

    // });
  }

  logDevice() {

    var module = {
      options: [],
      header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor],
      dataos: [
        { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
        { name: 'Windows', value: 'Win', version: 'NT' },
        { name: 'iPhone', value: 'iPhone', version: 'OS' },
        { name: 'iPad', value: 'iPad', version: 'OS' },
        { name: 'Kindle', value: 'Silk', version: 'Silk' },
        { name: 'Android', value: 'Android', version: 'Android' },
        { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
        { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
        { name: 'Macintosh', value: 'Mac', version: 'OS X' },
        { name: 'Linux', value: 'Linux', version: 'rv' },
        { name: 'Palm', value: 'Palm', version: 'PalmOS' }
      ],
      databrowser: [
        { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
        { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
        { name: 'Safari', value: 'Safari', version: 'Version' },
        { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
        { name: 'Opera', value: 'Opera', version: 'Opera' },
        { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
        { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
      ],
      init: function () {
        var agent = this.header.join(' '),
          os = this.matchItem(agent, this.dataos),
          browser = this.matchItem(agent, this.databrowser);

        return { os: os, browser: browser };
      },
      matchItem: function (string, data) {
        var i = 0,
          j = 0,
          html = '',
          regex,
          regexv,
          match,
          matches,
          version;

        for (i = 0; i < data.length; i += 1) {
          regex = new RegExp(data[i].value, 'i');
          match = regex.test(string);
          if (match) {
            regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
            matches = string.match(regexv);
            version = '';
            if (matches) { if (matches[1]) { matches = matches[1]; } }
            if (matches) {
              matches = matches.split(/[._]+/);
              for (j = 0; j < matches.length; j += 1) {
                if (j === 0) {
                  version += matches[j] + '.';
                } else {
                  version += matches[j];
                }
              }
            } else {
              version = '0';
            }
            return {
              name: data[i].name,
              version: parseFloat(version)
            };
          }
        }
        return { name: 'unknown', version: 0 };
      }
    };

    var e = module.init(),
      debug = '';

    let list = {
      token: this._conf.getItem('authToken'),
      username: this._conf.getItem('username'),
      deviceName: e.os.name,
      deviceOs: e.os.version,
      appVersion: e.browser.version,
      deviceType: 3,
    }
    // console.log(list);
    this._service.logDeviceYelo(list)
      .subscribe((res) => {
        if (res.code == 200) {
          // this._router.navigate([""]);
          // window.location.replace('');
        }
      });
  }


  onFacebookLoginClickk(): void {
    FB.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        this.me();
      } else {
        this.fblogin();
      }
    })
  }

  fblogin() {
    FB.login((result: any) => {
      this.me();
    }, { scope: 'user_friends' });
  }

  onFacebookLoginClick() {
    this.sub = this._auth.login("facebook").subscribe(
      (result) => {
        // console.log(result);
        this.me();
      }
    )
  }

  me() {
    this.resetValue();
    FB.api('/me?fields=id,picture,name,first_name,email,gender',
      (result: any) => {
        // console.log(result);        
        let list = {
          facebookId: result.id,
          email: result.email,
          profilePicUrl: "",
          loginType: 2,
          pushToken: "",
          place: "",
          city: "",
          countrySname: "",
          latitude: "",
          longitude: ""
          // facebookId: result.id,
          // username: result.name,
          // profilePicUrl: "",
          // signupType: 1,
          // facebookLogin: 1,
          // deviceType: 3
        }
        if (result.picture.data.url) {
          list.profilePicUrl = result.picture.data.url;
        } else {
          list.profilePicUrl = "";
        }
        this.loaderButtonfb = true;
        setTimeout(() => {
          this.loaderButtonfb = false;
        }, 3000);
        this._service.loginYelo(list)
          .subscribe((res) => {
            if (res.code == 200) {
              $(".loginPage").hide();
              this._conf.setItem('authToken', res.token);
              this._conf.setItem('email', res.email);
              this._conf.setItem('username', res.username);
              this._conf.setItem('userId', res.userId);
              this._conf.setItem('profilePicUrl', res.profilePicUrl);
              this._conf.setItem('mqttId', res.mqttId);
              this.registerErrMsg = false;
              this.logDevice();
              this._missionService.confirmheaderRefresh(this.headerRefresh);
              // this._router.navigate([""]);
              window.location.replace('');
            } else {
              this.registerFb();
              this._conf.setItem('fBregister', '11');
              this._conf.setItem('fbemail', result.email);
              this._conf.setItem('fbusername', result.name);
              // $(".fbregErr").show();
              window.location.replace('./register');
              // this._router.navigate(["./register"]);
              // $(".fbreg").hide();
              // $(".loginPage").hide();
              // setTimeout(() => {
              //   $(".errorregFb").hide();
              // }, 5000);
            }
          });
      });
  }

  registerFb() {
    FB.getLoginStatus((response: any) => {
      if (response) {
        this.accessToken = response.authResponse.accessToken;
        this._conf.setItem('fbauthToken', response.authResponse.accessToken);
        console.log(this.accessToken);
      }
    });

    FB.api('/me?fields=id,picture,name,first_name,email,gender',
      (result: any) => {
        // console.log(result); 
        this.profilePicUrl = result.picture.data.url;
        this.accessToken = this.accessToken;

      });
  }

  fbRegisterlogin() {
    let list = {
      accessToken: this.accessToken,
      username: this.userName,
      password: this.password,
      profilePicUrl: this.profilePicUrl,
      signupType: 1,
      deviceType: 3
    }
    this.loaderButtonfb = true;
    setTimeout(() => {
      this.loaderButtonfb = false;
    }, 3000);
    this._service.fbRegisterYelo(list)
      .subscribe((res) => {
        if (res.code == 200) {
          $(".fbregErr").hide();
          this._conf.setItem('authToken', res.response.authToken);
          this._conf.setItem('email', res.response.email);
          this._conf.setItem('username', this.userName);
          this._conf.setItem('userId', res.response.userId);
          this._conf.setItem('profilePicUrl', this.profilePicUrl);
          this._conf.setItem('mqttId', res.response.mqttId);
          this.registerErrMsg = false;
          this.logDevice();
          this.resetValue();
          this._missionService.confirmheaderRefresh(this.headerRefresh);
          // this._router.navigate([""]);
          window.location.replace('');
        } else {
          this.registerErrMsg = res.message;
          this.loaderButtonfb = false;
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 5000);
        }
      });
  }


  onGoogleLoginClick() {
    this.sub = this._auth.login("google").subscribe(
      (googleUser) => {
        // console.log(googleUser);
        this.onSuccess(googleUser);
      }
    )
  }

  signIngoogle(googleUser) {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

  onSuccess = (googleUser) => {
    this._zone.run(() => {
      // console.log("hi", googleUser.Zi.access_token);      
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.    

      var profile = googleUser.getBasicProfile();
      let list = {
        googleId: profile.getId(),
        email: profile.getEmail(),
        profilePicUrl: "",
        loginType: 3,
        pushToken: "",
        place: "",
        city: "",
        countrySname: "",
        latitude: "",
        longitude: ""
      }
      if (profile.getImageUrl()) {
        list.profilePicUrl = profile.getImageUrl();
      } else {
        list.profilePicUrl = "";
      }
      $.getJSON("https://freegeoip.net/json/", (data) => {
        list.city = data.city;
        list.countrySname = data.country_name;
        list.latitude = String(data.latitude);
        list.longitude = String(data.longitude);
      });
      // console.log(list);

      this._service.loginYelo(list)
        .subscribe((res) => {
          if (res.code == 200) {
            $(".loginPage").hide();
            this._conf.setItem('authToken', res.token);
            this._conf.setItem('email', res.email);
            this._conf.setItem('username', res.username);
            this._conf.setItem('userId', res.userId);
            this._conf.setItem('profilePicUrl', res.profilePicUrl);
            this._conf.setItem('mqttId', res.mqttId);
            this.registerErrMsg = false;
            this.logDevice();
            this._conf.setItem("google", '1');
            this._missionService.confirmheaderRefresh(this.headerRefresh);
            window.location.replace('');
          } else {
            $(".fbregErr").show();
            this._router.navigate(["./register"]);
            $(".loginPage").hide();
            setTimeout(() => {
              $(".errorregFb").hide();
            }, 5000);
          }
        });
    });

  }


  onFailure(error) {
    console.log(error);
  }


}

