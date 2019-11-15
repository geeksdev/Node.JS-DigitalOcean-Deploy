import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { RegisterService } from './register.service';
import { Configuration } from '../app.constants';
import { HomeService } from '../home/home.service';
import { Meta } from '@angular/platform-browser';
import * as moment from 'moment';
import { LanguageService } from '../app.language';
import { AuthService } from "angular2-social-login";


declare var FB: any;
declare var $: any;
declare var gapi: any;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public _auth: AuthService,
    private _zone: NgZone,
    private _meta: Meta,
    private _serviceHome: HomeService,
    private _missionService: MissionService,
    private _conf: Configuration,
    private _router: Router,
    private _service: RegisterService,
    private _lang: LanguageService) {
  }

  headerClosed: string;
  headerRefresh: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  email_Error = false;
  phone_Error = false;
  registerSave = false;
  registerErrMsg: any;
  registerUserErrMsg: any;
  registerEmailErrMsg: any;
  registerPhoneErrMsg: any;
  registerfullErrMsg: any;
  loaderButton = false;
  loaderButtonfb = false;
  accessToken: any;
  profilePicUrl: any;
  fbRegister = false;
  duration: any;
  data: any;
  registerSub: any;
  sub: any;
  LoginFb = false;

  ngOnInit() {

    this.registerSub = this._lang.engRegister;

    this.seo();
    this.countdownTimer();
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

    this.accessToken = this._conf.getItem('fbauthToken');
    let fBregister = this._conf.getItem('fBregister');
    let fbemail = this._conf.getItem('fbemail');
    let fbusername = this._conf.getItem('fbusername');
    if (fBregister == '11' && this.accessToken) {
      this.LoginFb = true;
      $(".loginPage").show();
      $(".loginPage1").hide();
      $(".loginPage2").removeClass("hide");
      // console.log(fbusername, fbemail, this.accessToken)
      this.fullName = fbusername;
      this.email = fbemail;
      // this.registerFb();
    }

    $("#phone").intlTelInput({
      nationalMode: true,
      separateDialCode: true,
      initialCountry:"il",
      preferredCountries:["il"],
      onlyCountries: ["ca","us","gb","cy","fr","il"],
      autoPlaceholder: false,
      // modify the auto placeholder
      customPlaceholder: null,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js"
    });
  }

  seo() {
    let list = {
      type: 9
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

  countdownTimer() {
    // get next Sunday
    var nextSunday = moment().day(56).format("YYYY-MM-DDT11:00:00Z");

    // make it a moment object again
    var event = moment(nextSunday);

    // get current time/date
    var current = moment();

    // get difference between event and current
    var diffTime = event.diff(current);

    // let moment.js make the duration out of the timestamp
    this.duration = moment.duration(diffTime, 'milliseconds');

    // set interval to milliseconds
    var interval = 1000;

    setInterval(() => {
      var final = this.duration - interval;
      this.duration = moment.duration(final, 'milliseconds');
      $('#clock').html(
        "<div class=\'days cell\'>" + this.duration.days() + "<span>days</span></div>" +
        "<div class=\'hours cell\'>" + this.duration.hours() + "<span>hours</span></div>" +
        "<div class=\'mins cell\'>" + this.duration.minutes() + "<span>mins</span></div>"
      )
    }, interval);
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

  register() {
    let flag = $("#phone").intlTelInput("getSelectedCountryData");
    let list = {
      username: this.userName,
      fullName: this.fullName,
      email: this.email,
      phoneNumber: "+" + flag.dialCode + this.phoneNumber,
      password: this.password,
      signupType: 1,
      deviceType: 3,
      deviceId: "",
      pushToken: "",
      location: "",
      latitude: "",
      longitude: "",
      profilePicUrl: ""
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 5000);
    if (this.userName && this.fullName && this.email && this.phoneNumber && this.password) {
      this._service.registerYelo(list)
        .subscribe((res) => {
          // this.loaderButton = false;
          if (res.code == 200) {
            this._conf.setItem('authToken', res.response.authToken);
            this._conf.setItem('email', res.response.email);
            this._conf.setItem('username', res.response.username);
            this._conf.setItem('userId', res.response.userId);
            this._conf.setItem('mqttId', res.response.mqttId);
            this.registerValue();
            this.registerErrMsg = false;
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

  emailValidationCheck(val) {
    this.emailValidation(val);
    let list = {
      email: val
    }
    this._service.emailCheck(list)
      .subscribe((res) => {
        if (res.code != 200) {
          alert(res.message);
          this.registerEmailErrMsg = res.message;
          setTimeout(() => {
            this.registerEmailErrMsg = false;
          }, 3000);
        } else {
          this.registerEmailErrMsg = false;
        }
      });
  }

  usernameCheck(val) {
    let list = {
      username: val
    }
    this._service.userNameCheck(list)
      .subscribe((res) => {
        if (res.code != 200) {
          alert(res.message);
          this.registerUserErrMsg = res.message;
          // this.userName = "";
          setTimeout(() => {
            this.registerUserErrMsg = false;
          }, 3000);
        } else {
          this.registerUserErrMsg = false;
        }
      });
  }

  phonenumberCheck(val) {
    this.mobileValidation(val);
    let flag = $("#phone").intlTelInput("getSelectedCountryData");
    let list = {
      phoneNumber: "+" + flag.dialCode + val
    }
    this._service.phoneNumberCheck(list)
      .subscribe((res) => {
        if (res.code != 200) {
          alert(res.message);
          this.registerPhoneErrMsg = res.message;
          setTimeout(() => {
            this.registerPhoneErrMsg = false;
          }, 3000);
        } else {
          this.registerPhoneErrMsg = false;
        }
      });
  }

  registerValue() {
    this.userName = "";
    this.email = "";
    this.phoneNumber = "";
    this.password = "";
  }

  emailValidation(value) {
    this.registerErrMsg = false;
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (regexEmail.test(value)) {
      this.email_Error = false;
      this.registerSave = true;
    } else {
      this.email_Error = true;
      this.registerSave = false;
    }
  }

  mobileValidation(value) {
    this.registerErrMsg = false;
    var regexPhone = /^(\+91-|\+91|0)?\d{10}$/;

    if (value.match(regexPhone)) {
      this.phone_Error = false;
      this.registerSave = true;
    } else {
      var val = value.replace(/([^+0-9]+)/gi, '')
      this.phoneNumber = val;
      this.phone_Error = true;
      this.registerSave = false;
    }
  }

  onFacebookLoginClickk(): void {
    FB.getLoginStatus((response: any) => {
      if (response.status === 'connected')
        this.me();
      else
        this.fblogin();
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
    this.registerValue();
    FB.api('/me?fields=id,picture,name,first_name,email,gender',
      (result: any) => {
        console.log(result);
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
        this._service.fbLoginYelo(list)
          .subscribe((res) => {
            if (res.code == 200) {
              // $(".loginPage").hide();
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
              // console.log(result);             
              $("#fullname").val(result.name);
              $("#email").val(result.email);
              $(".fbregErr").show();
              $(".fbreg").hide();
              $(".loginPage").show();
              $(".loginPage1").hide();
              $(".loginPage2").removeClass("hide");
              setTimeout(() => {
                $(".errorregFb").hide();
              }, 5000);
            }
          });
      });
  }

  registerFb() {
    FB.getLoginStatus((response: any) => {
      if (response) {
        this.accessToken = response.authResponse.accessToken;
        console.log("test", this.accessToken);
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
    let fullname = $("#fullname").val();
    let email = $("#email").val();
    if (fullname) {
      this.registerfullErrMsg = false;
      let list = {
        accessToken: this.accessToken,
        username: this.userName,
        fullName: fullname,
        email: email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        profilePicUrl: this.profilePicUrl,
        signupType: 2,
        deviceType: 3,
        deviceId: "",
        pushToken: "pushToken",
        location: "",
        latitude: "",
        longitude: ""
      }
      this.loaderButton = true;
      setTimeout(() => {
        this.loaderButton = false;
      }, 3000);
      this._service.registerYelo(list)
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
            this.registerValue();
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
    } else {
      this.registerfullErrMsg = true;
      setTimeout(() => {
        this.registerfullErrMsg = false;
      }, 5000);
    }
  }

  onGoogleLoginClick() {
    this.sub = this._auth.login("google").subscribe(
      (googleUser) => {
        console.log(googleUser);
        // this.onSuccess(googleUser);
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

      this._service.fbLoginYelo(list)
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
            // this.registerFb();
            // console.log(result);             
            $("#fullname").val(profile.getName());
            $("#email").val(profile.getEmail());
            $("#googleId").val(profile.getId());
            $("#googleToken").val(googleUser.Zi.access_token);
            // $(".fbregErr").show();
            // $(".fbreg").hide();
            // $(".loginPage").hide();
            // $(".gooReg").hide();
            // $(".gooRegister").show();
            $(".fbregErr").show();
            $(".fbreg").hide();
            $(".loginPage").show();
            $(".sign-up").hide();
            $(".googlePage").removeClass("hide");
            setTimeout(() => {
              $(".errorregFb").hide();
            }, 5000);
          }
        });
    });

  }


  googleRegister() {
    let fullname = $("#fullname").val();
    let email = $("#email").val();
    let googleId = $("#googleId").val();
    let googleToken = $("#googleToken").val();
    if (fullname) {
      this.registerfullErrMsg = false;
      let list = {
        googleToken: googleToken,
        googleId: googleId,
        username: this.userName,
        fullName: fullname,
        email: email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        profilePicUrl: this.profilePicUrl,
        signupType: 3,
        deviceType: 3,
        deviceId: "",
        pushToken: "pushToken",
        location: "",
        latitude: "",
        longitude: ""
      }
      // console.log(list);
      this._service.registerYelo(list)
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
            this.registerValue();
            this._conf.setItem("google", '1');
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
    } else {
      this.registerfullErrMsg = true;
      setTimeout(() => {
        this.registerfullErrMsg = false;
      }, 5000);
    }
  }


  onFailure(error) {
    console.log(error);
  }


}
