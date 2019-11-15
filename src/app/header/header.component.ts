import { Component, OnInit, HostListener, AfterViewInit, NgZone,ViewChild,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { MissionService } from '../app.service';
import { HomeService } from '../home/home.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { SettingsComponent } from '../settings/settings.component';

declare var $: any;
declare var google: any;
declare var FB: any;
declare var gapi: any;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ViewChild(SettingsComponent)
  // private editUserName: SettingsComponent;
  searchLayer: boolean = true;
  signUpContent: boolean = true;
  loginSignUpFB: boolean = false;
  header: any;
  closeShow = false;
  sellToggle = false;
  PhoneNum:any;

  constructor(
    private missionService: MissionService,
    private _conf: Configuration,
    private _zone: NgZone,
    private _router: Router,
    private homeService: HomeService,
    private _lang: LanguageService,
    public _auth: AuthService,
    private cdRef:ChangeDetectorRef
  ) {
    missionService.missionheaderOpen$.subscribe(
      headerOpen => {
        // this.headerListOpen = true;
        // this.headerListHelpOpen = false;
        // $(".headerMenu").addClass("headerOpenactive");
        // $(".HeaderPageList").addClass("container");
        this.headerListOpen = true;
        this.headerListHelpOpen = false;
        this.headerFilter = false;
        $(".headerMenu").removeClass("headerOpenactive");
        $(".HeaderPageList").removeClass("container");
      });
    missionService.missionheaderClose$.subscribe(
      headerClose => {
        this.headerListOpen = true;
        this.headerListHelpOpen = false;
        this.headerFilter = true;
        $(".headerMenu").removeClass("headerOpenactive");
        $(".HeaderPageList").removeClass("container");
      });
    missionService.missionheaderClosed$.subscribe(
      headerClosed => {
        // this.headerListOpen = false;
        // this.headerListHelpOpen = false;
        this.headerListOpen = true;
        this.headerListHelpOpen = false;
        this.headerFilter = false;
        $(".headerMenu").removeClass("headerOpenactive");
        $(".HeaderPageList").removeClass("container");
      });
    missionService.missionheaderHelpClose$.subscribe(
      headerHelpClose => {
        // this.headerListHelpOpen = true;
        this.headerListOpen = true;
        this.headerListHelpOpen = false;
        this.headerFilter = false;
        $(".headerMenu").removeClass("headerOpenactive");
        $(".HeaderPageList").removeClass("container");
      });

    missionService.missionServer$.subscribe(
      serverError => {
        $("#serverError").modal("show");
      });

    missionService.missionPopup$.subscribe(
      headerRefresh => {
        this.loginSignUp();
      });

    missionService.missionheaderRefresh$.subscribe(
      headerRefresh => {
        this.ngOnInit();
      });
  }

  headerFilter = false;
  headerOpen = false;
  menuListDrop = false;
  headerListOpen = false;
  headerListHelpOpen = false;
  radioSelectList = false;
  loginList = false;
  token: any;
  userName: any;
  profilePicUrl: any;
  searchCat: any;
  headerRefresh: string;
  phoneNumber: string;
  email: string;
  otpNumber: string;
  deviceOs: string;
  registerSave = false;
  phone_Error = false;
  email_Error: any;
  succesSeller = false;
  placelatlng: any;
  listSell: any;
  sideListMenu = false;
  login_Toggle = false;
  signUp_toggle = false;
  SocialToggle = false;
  forgot_Toggle = false;
  otp_Toggle = false;
  registerPhoneErrMsg: any;
  registerUserErrMsg: any;

  username: string;
  phonenumber: string;
  password: string;
  registerErrMsg: any;
  loaderButton = false;
  loaderButtonfb = false;
  fullName: string;
  registerEmailErrMsg: any;
  loginModal = false;
  registerfullErrMsg: any;
  sub: any;
  accessToken: any;

  catList: any;
  toggleSlide = false;
  willingSlide = false;

  productName: string;
  productDescription: string;
  productPrice: string;
  currency: string;
  condition: string;
  category: string;
  negotiable = "0";
  willing = 0;
  imgUrl = [];
  errMsg: any;
  cloudinaryOptions: CloudinaryOptions = new CloudinaryOptions({
    cloudName: 'yeloadmin',
    uploadPreset: 'iirvrtog',
    autoUpload: true
  });

  uploader: CloudinaryUploader = new CloudinaryUploader(this.cloudinaryOptions);

  imageUploader = (item: any, response: string, status: number, headers: any) => {
    let cloudinaryImage = JSON.parse(response);
    console.log(cloudinaryImage)
    let list = {
      img: cloudinaryImage.secure_url,
      cloudinaryPublicId: cloudinaryImage.public_id,
      containerHeight: cloudinaryImage.height,
      containerWidth: cloudinaryImage.width
    }
    this.submitData(list);
  };

  // ngAfterViewInit() {
  //   this.userName = this.editUserName.userName;
  // }
  ngOnInit() {
    this.uploader.onSuccessItem = this.imageUploader;
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    
    if(selectedLang){
      switch(selectedLang){

        case 1:this.header = this._lang.engHeader1;
        // this.placelatlng = {
        //   'lat':'44.0165',
        //   'lng':'21.0059'
        // }
        // this._conf.setItem('latlng',JSON.parse(this.placelatlng));
              break; 

        case 2:  this.header = this._lang.engHeader;
                break;
      }
    }
    else{
      this.header = this._lang.engHeader;
      // this.placelatlng = {
      //   'lat':'44.0165',
      //   'lng':'21.0059'
      // }
      // this._conf.setItem('latlng',JSON.parse(this.placelatlng));
    }
    // this.header = this._lang.engHeader;
    FB.init({
      appId: '895123320630756',
      cookie: false,
      xfbml: true,
      version: 'v2.7'
    });
    let latlng1 = this._conf.getItem('latlng');
    if (!latlng1) {
      this.currentLocation();
    }
    this.token = this._conf.getItem('authToken');
    if (this.token) {
      console.log("true");
      this.userName = this._conf.getItem('username');
      this.profilePicUrl = this._conf.getItem('profilePicUrl');
      this.loginList = true;
      // $(".headerMenu").removeClass("loginDetailsHeader");
      this.userReject();
    } else {
      console.log("false");
      this.loginList = false;
      // $(".headerMenu").addClass("loginDetailsHeader");
    }
    $('ul.dropdown-menu').on('click', function (event) {
      event.stopPropagation();
    });

    this.listGetCategories();
    $.getJSON("https://restcountries.eu/rest/v1/alpha/in", (data) => {
      // console.log(data)
      // this.currency = data.currencies[0];
      this.currency = "ILS";
    });
  }

  listGetCategories() {
    this.homeService.getCategoriesList()
      .subscribe((res) => {
        if (res.code == 200) {
          this.catList = res.data;
        }
      });
  }

  homeLogo() {
    $("html, body").animate({ scrollTop: 0 }, 500);
    this._router.navigate([""]);
  }

  currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.placelatlng = {
          'lat': lat,
          'lng': lng
        }
        console.log("currentLatLng", this.placelatlng);
        this._conf.setItem('latlng', JSON.stringify(this.placelatlng));
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              for (var i = 0; i < results[1].address_components.length; i += 1) {
                var addressObj = results[1].address_components[i];
                for (var j = 0; j < addressObj.types.length; j += 1) {
                  if (addressObj.types[j] === 'locality') {
                    // console.log(addressObj.types[j]);
                    var city = addressObj.long_name;
                    // console.log(results[0].formatted_address)                   
                  }
                  if (addressObj.types[j] === 'country') {
                    // console.log(addressObj.types[j]);
                    var country = addressObj.short_name;
                    // console.log(results[0].formatted_address)                   
                  }
                }
              }
              // console.log("cityCountry", city + ", " + country)
              $("#cityAreai").val(city + ", " + country);
              this._conf.setItem('recentCity', city + ", " + country);
              $("#searchLocation1").val(city + ", " + country);
            }
            // console.log(results)
          }
        });

      }, this.geoError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  geoError() {
    console.log("Geolocation is not supported by this browser.");
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = $(window).scrollTop();
    // if (number > 20) {
    //   this.headerOpen = true;
    // } else {
    //   this.headerOpen = false;
    // }
  }

  userReject() {
    let list = {
      latitude: "",
      longitude: "",
      token: this.token,
      offset: "0",
      limit: "40"
    }
    this.placelatlng = this._conf.getItem('latlng');
    if (this.placelatlng) {
      this.placelatlng = JSON.parse(this.placelatlng);
      list.latitude = this.placelatlng.lat;
      list.longitude = this.placelatlng.lng;
    }
    this.homeService.homeAllList(list)
      .subscribe((res) => {
        if (res.code == 200) {

        }
      }, (err) => {
        var error = JSON.parse(err._body);
        console.log(error);
        var listErr = error.code;
        if (listErr == 401) {
          // console.log(error);
          this._conf.clear();
          $("#userRejected").modal("show");
        }
      });
  }




  radioSelect(val) {
    this.emptySell();
    if (val != 1) {
      this.radioSelectList = true;
    } else {
      this.radioSelectList = false;
    }
  }
  succesSellerList() {
    $("#phoneSell").intlTelInput({
      // nationalMode: true,
      // separateDialCode: true,
      // initialCountry: "auto",
      separateDialCode: true,
      initialCountry:"il",
      preferredCountries:["il"],
      onlyCountries: ["ca","us","gb","cy","fr","il"],
      autoPlaceholder: false,
      // modify the auto placeholder
      customPlaceholder: null,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js"
    });
    $("#sellModal").modal("show");
    this.succesSeller = false;
    this.emptySell();
    // this._router.navigate(["./sell"]);
  }


  emptySell() {
    this.phoneNumber = "";
    this.email = "";
    this.email_Error = false;
    this.phone_Error = false;
  }

  sellSend(val) {
    this.email_Error = false;
    this.phone_Error = false;
    if (val == 1) {
      this.listSell = {
        type: "1",
        emailId: this.email
      }
    } else {
      let flag = $("#phoneSell").intlTelInput("getSelectedCountryData");
      this.listSell = {
        type: "2",
        phoneNumber: "+" + flag.dialCode + this.phoneNumber
      }
    }
    this.homeService.sellList(this.listSell)
      .subscribe((res) => {
        if (res.code == 200) {
          this.succesSeller = true;
          this.radioSelectList = false;
          this.emptySell();
        } else {
          this.email_Error = res.message;
        }
      });
  }


  searchCategory(val) {
    this._router.navigate([""]);
    if (val == 1) {
      this.closeShow = true;
    } else {
      this.closeShow = true;
      this.missionService.confirmcatName(this.searchCat);
    }
  }

  cancelSearch() {
    this._router.navigate([""]);
    this.closeShow = false;
    this.missionService.confirmcatName("1");
    this.searchCat = "";
  }

  menuListDropdown1() {
    $(".listMenu").removeClass("open");
    $(".firstMenu").addClass("open");
    $(".firstMenu").removeClass("opened");
  }
  menuListDropdown() {
    $(".firstMenu").addClass("opened");
    $(".listMenu").removeClass("open");
    $(".secondMenu").addClass("open");
  }

  logOut() {

    let google = this._conf.getItem("google");
    if (google == '1') {
      let url = window.location.href;
      document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + url;
    }
    this._conf.clear();
    this.missionService.confirmheaderRefresh(this.headerRefresh);
    this._router.navigate([""]);
    // window.location.replace('');    

    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
  }

  logOutReject() {
    this._conf.clear();
    window.location.replace('');
  }


  // onFacebookLoginClick(): void {
  //   FB.ui({
  //     method: 'send',
  //     link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
  //   });
  // }


  serverError() {
    window.location.replace('');
  }

  searchLayerToggle() {
    this.searchLayer = false;
  }

  removeLayer() {
    this.searchLayer = true;
    $("#search_input").val("");
  }

  filterToggle() {
    // $(".filterRecent").addClass("hide");
    // $(".filterRecentH").addClass("hide");
    // $(".filterRecentF").addClass("hide");
    $("#sideDetailsId").toggleClass('active');
    $("body").toggleClass("hideHidden");
  }

  sideMenuOpen() {
    $("html, body").animate({ scrollTop: 0 }, 500);
    this.sideListMenu = !this.sideListMenu;
  }


  loginSignUp() {
    $("#phone").intlTelInput({
      separateDialCode: true,
      initialCountry:"il",
      preferredCountries:["il"],
      onlyCountries: ["ca","us","gb","cy","fr","il"],
      autoPlaceholder: false,
      // modify the auto placeholder
      customPlaceholder: null,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js"
    });
    $("#loginModal").modal("show");
    this.socialLink();
  }

  loginToggle() {
    this.login_Toggle = true;
    this.signUp_toggle = false;
    this.SocialToggle = true;
    this.otp_Toggle = false;
    this.forgot_Toggle = false;
    this.registerValue();
  }
  signUpToggle() {
    this.login_Toggle = false;
    this.signUp_toggle = true;
    this.SocialToggle = true;
    this.forgot_Toggle = false;
  }
  socialLink() {
    this.registerValue();
    this.login_Toggle = false;
    this.signUp_toggle = false;
    this.SocialToggle = false;
    this.otp_Toggle = false;
    this.forgot_Toggle = false;
  }

  resetToggle() {
    this.registerValue();
    this.login_Toggle = false;
    this.signUp_toggle = false;
    this.forgot_Toggle = true;
  }

  otpToggle() {
    this.loaderButton = false;
    this.login_Toggle = false;
    this.signUp_toggle = false;
    this.forgot_Toggle = false;
    this.otp_Toggle = true;
  }

  sellPopup() {
    if (this.token) {
      $("#sellModals").modal("show");
      this.restSell();
      this.imgUrl = [];     
    } else {
      this.loginSignUp();
    }
  }
  postShow:any;
  // checkZone() {
  //   this.errMsg = false;
  //   this.swapArr =[];
  //   let list = {
  //     latitude: this.placelatlng.lat,
  //     longitude: this.placelatlng.lng,
  //     token: this.token
  //   }
  //   this.homeService.zoneList(list)
  //     .subscribe((res) => {
  //        $("#sellModals").modal("show");
  //       if(res.code != 200){
  //         this.errMsg = res.message;
  //         this.postShow = true;
  //       }else{
  //         this.postShow = false;
  //       }
  //     })
  // }

  restSell() {
    this.productPrice = "";
    this.productName = "";
    this.productDescription = "";
    $("#selCat").val('');
    $("#selProd").val('');
    // this.condition = "";
    // this.category = "";
  }

  selectCurrency(val) {
    this.currency = val;
  }

  selectCondition(val) {
    this.condition = val;
  }

  selectCat(val) {
    this.category = val;
  }

  switchToggle(val) {
    if (val == true) {
      this.negotiable = "1";
    } else {
      this.negotiable = "0";
    }
  }

  willingToggle(val) {
    this.swapArr = [];
    if (val == true) {
      this.willing = 1;
    } else {
      this.willing = 0;
    }
  }

  uploadProduct() {
    let city = $("#cityS").val();
    let state = $("#state").val();
    let location = $("#locate").val()
    let lat = $("#latS").val();
    let lang = $("#lngS").val();
    if (this.imgUrl.length > 0 && location) {
      let list = {
        token: this.token,
        type: "0",
        mainUrl: this.imgUrl[0].img,
        thumbnailImageUrl: this.imgUrl[0].img,
        imageCount: this.imgUrl.length,
        containerHeight: this.imgUrl[0].containerHeight,
        containerWidth: this.imgUrl[0].containerWidth,
        cloudinaryPublicId: this.imgUrl[0].cloudinaryPublicId,
        price: this.productPrice,
        currency: this.currency,
        productName: this.productName,
        description: this.productDescription,
        condition: this.condition,
        negotiable: this.negotiable,
        isSwap: this.willing,
        swapingPost: JSON.stringify(this.swapArr),
        category: this.category,
        location: location,
        latitude: lat,
        longitude: lang,
        city: city,
        countrySname: state,
        imageUrl1: "",
        cloudinaryPublicId1: "",
        imageUrl2: "",
        cloudinaryPublicId2: "",
        imageUrl3: "",
        cloudinaryPublicId3: "",
        imageUrl4: "",
        cloudinaryPublicId4: ""
      }
      if (this.imgUrl && this.imgUrl[1]) {
        list.imageUrl1 = this.imgUrl[1].img;
        list.cloudinaryPublicId1 = this.imgUrl[1].cloudinaryPublicId;
      }
      if (this.imgUrl && this.imgUrl[2]) {
        list.imageUrl2 = this.imgUrl[2].img;
        list.cloudinaryPublicId2 = this.imgUrl[2].cloudinaryPublicId;
      }
      if (this.imgUrl && this.imgUrl[3]) {
        list.imageUrl3 = this.imgUrl[3].img;
        list.cloudinaryPublicId3 = this.imgUrl[3].cloudinaryPublicId;
      }
      if (this.imgUrl && this.imgUrl[4]) {
        list.imageUrl4 = this.imgUrl[4].img;
        list.cloudinaryPublicId4 = this.imgUrl[4].cloudinaryPublicId;
      }
      this.loaderButton = true;
      setTimeout(() => {
        this.loaderButton = false;
        this.errMsg = false;
      }, 3000)
      this.homeService.postProduct(list)
        .subscribe((res) => {
          this.loaderButton = false;
          if (res.code == 200) {            
            this._router.navigate(["./settings"]);
            this.missionService.confirmheaderRefresh(this.headerRefresh);
            $(".modal").modal("hide");
          }
        }, err => {
          this.loaderButton = false;
          var error = JSON.parse(err._body);
          this.errMsg = error.message;
        });
    }
  }

  // swapList: any;
  // swapSearch(val) {
  //   let list = {
  //     token: this.token,
  //     productName: val
  //   }
  //   if (val.length > 0) {
  //     this.homeService.searchSwap(list)
  //       .subscribe((res) => {
  //         if (res.code == 200) {
  //           this.swapList = res.data;
  //         } else {
  //           this.swapList = [];
  //         }
  //       })
  //   } else {
  //     this.swapList = [];
  //   }
  // }

  swapArr = [];
  swapPost: string;
  postSwap(list) {
    let data = {
      swapDescription: list.description,
      swapPostId: list.postId,
      swapTitle: list.productName
    }
    this.swapArr.push(data);
  }

  cancelSwapList(i) {
    this.swapArr.splice(i, 1)
  }

  blurSwap() {
    setTimeout(() => {
      this.swapPost = "";
      // this.swapList = [];
    }, 1000)
  }

  cancelSwap() {
    this.swapPost = "";
    this.swapArr = [];
    // this.swapList = [];
  }

  submitData(url) {
    // console.log("uuuuuuuu", url);
    if (this.imgUrl && this.imgUrl.length < 5) {
      this.imgUrl.push(url);
      console.log("iiiiiii", this.imgUrl);
    }
  }

  removeImg(i) {
    this.imgUrl.splice(i, 1);
    console.log("rm", this.imgUrl);
  }


  fileUploader() {
    this.uploader.uploadAll();
  }

  public currencyList = [
    { value: "ILS", text: "Israel New Shekels" },
    // { value: "USD", text: "United States Dollars" },
    // { value: "EUR", text: "Euro" },
    // { value: "GBP", text: "United Kingdom Pounds" },
    // { value: "DZD", text: "Algeria Dinars" },
    // { value: "ARP", text: "Argentina Pesos" },
    // { value: "AUD", text: "Australia Dollars" },
    // { value: "ATS", text: "Austria Schillings" },
    // { value: "BSD", text: "Bahamas Dollars" },
    // { value: "BBD", text: "Barbados Dollars" },
    // { value: "BEF", text: "Belgium Francs" },
    // { value: "BMD", text: "Bermuda Dollars" },
    // { value: "BRR", text: "Brazil Real" },
    // { value: "BGL", text: "Bulgaria Lev" },
    // { value: "CAD", text: "Canada Dollars" },
    // { value: "CLP", text: "Chile Pesos" },
    // { value: "CNY", text: "China Yuan Renmimbi" },
    // { value: "CYP", text: "Cyprus Pounds" },
    // { value: "CSK", text: "Czech Republic Koruna" },
    // { value: "DKK", text: "Denmark Kroner" },
    // { value: "NLG", text: "Dutch Guilders" },
    // { value: "XCD", text: "Eastern Caribbean Dollars" },
    // { value: "EGP", text: "Egypt Pounds" },
    // { value: "FJD", text: "Fiji Dollars" },
    // { value: "FIM", text: "Finland Markka" },
    // { value: "FRF", text: "France Francs" },
    // { value: "DEM", text: "Germany Deutsche Marks" },
    // { value: "XAU", text: "Gold Ounces" },
    // { value: "GRD", text: "Greece Drachmas" },
    // { value: "HKD", text: "Hong Kong Dollars" },
    // { value: "HUF", text: "Hungary Forint" },
    // { value: "ISK", text: "Iceland Krona" },
    // { value: "INR", text: "India Rupees" },
    // { value: "IDR", text: "Indonesia Rupiah" },
    // { value: "IEP", text: "Ireland Punt" },
    // { value: "ILS", text: "Israel New Shekels" },
    // { value: "ITL", text: "Italy Lira" },
    // { value: "JMD", text: "Jamaica Dollars" },
    // { value: "JPY", text: "Japan Yen" },
    // { value: "JOD", text: "Jordan Dinar" },
    // { value: "KRW", text: "Korea(South) Won" },
    // { value: "LBP", text: "Lebanon Pounds" },
    // { value: "LUF", text: "Luxembourg Francs" },
    // { value: "MYR", text: "Malaysia Ringgit" },
    // { value: "MXP", text: "Mexico Pesos" },
    // { value: "NLG", text: "Netherlands Guilders" },
    // { value: "NZD", text: "New Zealand Dollars" },
    // { value: "NOK", text: "Norway Kroner" },
    // { value: "PKR", text: "Pakistan Rupees" },
    // { value: "XPD", text: "Palladium Ounces" },
    // { value: "PHP", text: "Philippines Pesos" },
    // { value: "XPT", text: "Platinum Ounces" },
    // { value: "PLZ", text: "Poland Zloty" },
    // { value: "PTE", text: "Portugal Escudo" },
    // { value: "ROL", text: "Romania Leu" },
    // { value: "RUR", text: "Russia Rubles" },
    // { value: "SAR", text: "Saudi Arabia Riyal" },
    // { value: "XAG", text: "Silver Ounces" },
    // { value: "SGD", text: "Singapore Dollars" },
    // { value: "SKK", text: "Slovakia Koruna" },
    // { value: "ZAR", text: "South Africa Rand" },
    // { value: "KRW", text: "South Korea Won" },
    // { value: "ESP", text: "Spain Pesetas" },
    // { value: "XDR", text: "Special Drawing Right(IMF)" },
    // { value: "SDD", text: "Sudan Dinar" },
    // { value: "SEK", text: "Sweden Krona" },
    // { value: "CHF", text: "Switzerland Francs" },
    // { value: "TWD", text: "Taiwan Dollars" },
    // { value: "THB", text: "Thailand Baht" },
    // { value: "TTD", text: "Trinidad and Tobago Dollars" },
    // { value: "TRL", text: "Turkey Lira" },
    // { value: "VEB", text: "Venezuela Bolivar" },
    // { value: "ZMK", text: "Zambia Kwacha" },
    // { value: "EUR", text: "Euro" },
    // { value: "XCD", text: "Eastern Caribbean Dollars" },
    // { value: "XDR", text: "Special Drawing Right(IMF)" },
    // { value: "XAG", text: "Silver Ounces" },
    // { value: "XAU", text: "Gold Ounces" },
    // { value: "XPD", text: "Palladium Ounces" },
    // { value: "XPT", text: "Platinum Ounces" }
  ]


  resetPassword() {
    let list = {
      email: this.email,
      type: '0'
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
      this.registerErrMsg = false;
    }, 5000);
    if (this.email) {
      this.homeService.resetPwd(list)
        .subscribe((res) => {
          this.loaderButton = false;
          if (res.code == 200) {
            this.email = "";
            this.registerErrMsg = res.message;
            setTimeout(() => {
              this.loginToggle();
            }, 3000);
          } else {
            this.registerErrMsg = res.message;
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




  resetValue() {
    this.username = "";
    this.password = "";
  }

  login() {
    console.log("the login page is :")
    let list = {
      username: this.username,
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
    if (this.username && this.password) {
      this.homeService.loginYelo(list)
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
            this.missionService.confirmheaderRefresh(this.headerRefresh);
            $(".modal").modal("hide");
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
     console.log(list);
    this.homeService.logDeviceYelo(list)
      .subscribe((res) => {
        if (res.code == 200) {
          // this._router.navigate([""]);
          // window.location.replace('');
        }
      });
  }


  deviceId() {
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

    this.deviceOs = e.os.name;
    this.otpSend();
  }


  otpSend() {
    let fullName = $("#fullname").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let phonenumber = $("#phone").val();
    let password = $("#signPwd").val();
    let flag = $("#phone").intlTelInput("getSelectedCountryData");
    let list = {
      deviceId: this.deviceOs,
      phoneNumber: "+" + flag.dialCode + this.phonenumber
    }
    console.log("the selected falt and country code", list)
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 5000);
    console.log("the item are :",fullName,username,email,phonenumber,password )
    if (username && fullName && email && phonenumber && password){
      this.otpToggle();
      this.homeService.otpCheck(list)
        .subscribe((res) => {
          this.loaderButton = false;
          this.PhoneNum= list.phoneNumber;
          console.log("the phonenumber is :", this.PhoneNum);
          if (res.code == 200) {

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

  otpVerify() {
    let flag = $("#phone").intlTelInput("getSelectedCountryData");
    let list = {
      otp: this.otpNumber,
      deviceId: this.deviceOs,
      phoneNumber: "+" + flag.dialCode + this.phonenumber
    }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 5000);
    this.homeService.verifyOtp(list)
      .subscribe((res) => {
        this.loaderButton = false;
        if (res.code == 200) {
          this.register();
        } else {
          this.loaderButton = false;
          this.registerErrMsg = res.message;
          setTimeout(() => {
            this.registerErrMsg = false;
          }, 3000);
        }
      });

  }



  register() {
    let fullName = $("#fullname").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let phonenumber = $("#phone").val();
    let password = $("#signPwd").val();

    let flag = $("#phone").intlTelInput("getSelectedCountryData");
    let list = {
      username: username,
      fullName: fullName,
      email: email,
      phoneNumber: "+" + flag.dialCode + phonenumber,
      password: password,
      signupType: 1,
      deviceType: 3,
      deviceId: "",
      pushToken: "",
      location: "",
      latitude: "",
      longitude: "",
      profilePicUrl: ""
    }
    console.log("the request data is :", list);
    // if (this.singnImg) {
    //   list.profilePicUrl = this.singnImg;
    // }
    this.loaderButton = true;
    setTimeout(() => {
      this.loaderButton = false;
    }, 5000);
    console.log("the request data is from field missing:", username,fullName,email,phonenumber,password);
    if (username && fullName && email && phonenumber && password) {
      this.homeService.registerYelo(list)
        .subscribe((res) => {
          // this.loaderButton = false;
          if (res.code == 200) {
            this._conf.setItem('authToken', res.response.authToken);
            this._conf.setItem('email', res.response.email);
            this._conf.setItem('username', res.response.username);
            this._conf.setItem('userId', res.response.userId);
            this._conf.setItem('mqttId', res.response.mqttId);
            this._conf.setItem('profilePicUrl', res.response.profilePicUrl);
            this.registerValue();
            this.registerErrMsg = false;
            this.logDevice();
            this.missionService.confirmheaderRefresh(this.headerRefresh);
            $(".modal").modal("hide");
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
  phonenumberCheck(val) {
    this.mobileValidation(val);
    let flag = $("#phone").intlTelInput("getSelectedCountryData");
    let list = {
      phoneNumber: "+" + flag.dialCode + val
    }
    this.homeService.phoneNumberCheck(list)
      .subscribe((res) => {
        if (res.code != 200) {
          // alert(res.message);
          this.registerPhoneErrMsg = res.message;
          this.phonenumber = "";
          setTimeout(() => {
            this.registerPhoneErrMsg = false;
          }, 3000);
        } else {
          this.registerPhoneErrMsg = false;
        }
      });
  }

  registerValue() {
    this.fullName = "";
    this.username = "";
    this.email = "";
    this.phonenumber = "";
    this.password = "";
    this.otpNumber = "";
  }

  emailValidation(value) {
    this.registerErrMsg = false;
    if (value.length > 5) {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(value)) {
        this.registerEmailErrMsg = false;
        this.registerSave = true;
      } else {
        this.registerEmailErrMsg = "email is incorrect";
        this.registerSave = false;
      }
    }
  }

  mobileValidation(value) {
    this.registerErrMsg = false;
    var regexPhone = /^(\+91-|\+91|0)?\d{10}$/;

    if (value.match(regexPhone)) {
      this.phone_Error = false;
      this.registerSave = true;
    } else {
      var val = value.replace(/([^+0-9]+)/gi, '');
      this.phonenumber = val;
      this.phone_Error = true;
      this.registerSave = false;
    }
  }
  
  signInWithGoogle(): void {
    this._auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => 
      {
        console.log("the google user",x);
        this.onGoogle();
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

  // onFacebookLoginClick() {
  //   this.sub = this._auth.login("facebook").subscribe(
  //     (result) => {
  //       // console.log(result);
  //       this.me();
  //     }
  //   )
  // }
  onGoogle() {
    this._auth.authState.subscribe((user) => {
      var googleUser = user;
      console.log("test", user);
      if (user && user.provider == 'GOOGLE') {
        this._zone.run(() => {
          let list = {
            googleId: googleUser.id,
            email: googleUser.email,
            profilePicUrl: "",
            loginType: 3,
            pushToken: "",
            place: "",
            city: "",
            countrySname: "",
            latitude: "",
            longitude: ""
          }
          if (googleUser.photoUrl) {
            list.profilePicUrl = googleUser.photoUrl;
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

          $(".loadgoogleSocial").show();
          setTimeout(() => {
            $(".loadgoogleSocial").hide();
          }, 3000);
          this.homeService.loginYelo(list)
            .subscribe((res) => {
              if (res.code == 200) {
                console.log("the google 3 ====================")
                $(".loadgoogleSocial").hide();
                this._conf.setItem('authToken', res.token);
                this._conf.setItem('email', res.email);
                this._conf.setItem('username', res.username);
                this._conf.setItem('userId', res.userId);
                this._conf.setItem('profilePicUrl', res.profilePicUrl);
                this._conf.setItem('mqttId', res.mqttId);
                this.registerErrMsg = false;
                this.logDevice();
                this.missionService.confirmheaderRefresh(this.headerRefresh);
                // this._router.navigate([""]);
                window.location.replace('');
              } else {
                console.log("the google ====================")
                $("#fullname").val(googleUser.name);
                $("#email").val(googleUser.email);
                $("#googleId").val(googleUser.id);
                $("#googleToken").val(googleUser.idToken);
                $(".signupClick").trigger("click");
                $(".ls").hide();
                $(".signUpgoogle").show();
              }
            });
        });
      }
    });

  }


  FBClicked:boolean = false;
  me() {
    // alert("the facebook ligon");
    this._auth.authState.subscribe((user) => {      
      console.log("test", user);
      if (user && user.provider == 'FACEBOOK') {
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
        }
        if (result.picture.data.url) {
          list.profilePicUrl = result.picture.data.url;
        } else {
          list.profilePicUrl = "";
        }
        $(".loadSocial").show();
        setTimeout(() => {
          $(".loadSocial").hide();
        }, 3000);
        this.homeService.loginYelo(list)
          .subscribe((res) => {
            if (res.code == 200) {
              $(".loadSocial").hide();
              console.log("the facebook is :",res)
              this._conf.setItem('authToken', res.token);
              this._conf.setItem('email', res.email);
              this._conf.setItem('username', res.username);
              this._conf.setItem('userId', res.userId);
              this._conf.setItem('profilePicUrl', res.profilePicUrl);
              this._conf.setItem('mqttId', res.mqttId);
              this.registerErrMsg = false;
              this.logDevice();
              this.missionService.confirmheaderRefresh(this.headerRefresh);
              // this._router.navigate([""]);
              window.location.replace('');
            } else {
              this.FBClicked = true;
              console.log("the facebook is :",res);
              this.registerFb();
              $("#fullname").val(result.name);
              $("#email").val(result.email);
              $(".signupClick").trigger("click");
              $(".signupRegister").hide();
              $(".signUpFb").show();             
            }
          });
      });
    }
    });
  }

  social:any;
  registerFb() {
    this.social = 1;
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
        username: this.username,
        fullName: fullname,
        email: email,
        phoneNumber: this.phonenumber,
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
      this.homeService.registerYelo(list)
        .subscribe((res) => {
          if (res.code == 200) {
            this.loaderButton = false;
            this._conf.setItem('authToken', res.response.authToken);
            this._conf.setItem('email', res.response.email);
            this._conf.setItem('username', this.username);
            this._conf.setItem('userId', res.response.userId);
            this._conf.setItem('profilePicUrl', this.profilePicUrl);
            this._conf.setItem('mqttId', res.response.mqttId);
            this.registerErrMsg = false;
            this.logDevice();
            this.registerValue();
            this.missionService.confirmheaderRefresh(this.headerRefresh);
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

  // onGoogleLoginClick() {
  //   this.sub = this._auth.login("google").subscribe(
  //     (googleUser) => {
  //       console.log(googleUser);
  //       this.onSuccess(googleUser);
  //     }
  //   )
  // }

  onSuccess = (googleUser) => {
    this._zone.run(() => {
      let list = {
        googleId: googleUser.uid,
        email: googleUser.email,
        profilePicUrl: "",
        loginType: 3,
        pushToken: "",
        place: "",
        city: "",
        countrySname: "",
        latitude: "",
        longitude: ""
      }
      if (googleUser.image) {
        list.profilePicUrl = googleUser.image;
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

      $(".loadgoogleSocial").show();
      setTimeout(() => {
        $(".loadgoogleSocial").hide();
      }, 3000);
      this.homeService.loginYelo(list)
        .subscribe((res) => {
          if (res.code == 200) {
            $(".loadgoogleSocial").hide();
            this._conf.setItem('authToken', res.token);
            this._conf.setItem('email', res.email);
            this._conf.setItem('username', res.username);
            this._conf.setItem('userId', res.userId);
            this._conf.setItem('profilePicUrl', res.profilePicUrl);
            this._conf.setItem('mqttId', res.mqttId);
            this.registerErrMsg = false;
            this.logDevice();
            this.missionService.confirmheaderRefresh(this.headerRefresh);
            // this._router.navigate([""]);
            window.location.replace('');
          } else {
            $("#fullname").val(googleUser.name);
            $("#email").val(googleUser.email);
            $("#googleId").val(googleUser.uid);
            $("#googleToken").val(googleUser.idToken);
            $(".signupClick").trigger("click");
            $(".ls").hide();
            $(".signUpgoogle").show();
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
        username: this.username,
        fullName: fullname,
        email: email,
        phoneNumber: this.phonenumber,
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

      this.loaderButton = true;
      setTimeout(() => {
        this.loaderButton = false;
      }, 3000);
      this.homeService.registerYelo(list)
        .subscribe((res) => {
          if (res.code == 200) {
            this.loaderButton = false;
            this._conf.setItem('authToken', res.response.authToken);
            this._conf.setItem('email', res.response.email);
            this._conf.setItem('username', this.username);
            this._conf.setItem('userId', res.response.userId);
            this._conf.setItem('profilePicUrl', this.profilePicUrl);
            this._conf.setItem('mqttId', res.response.mqttId);
            this.registerErrMsg = false;
            this.logDevice();
            this.registerValue();
            // this._conf.setItem("google", '1');
            this.missionService.confirmheaderRefresh(this.headerRefresh);
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
  usernameCheck(val) {
    let list = {
      username: val
    }
    this.homeService.userNameCheck(list)
      .subscribe((res) => {
        if (res.code != 200) {
          // alert(res.message);
          this.registerUserErrMsg = res.message;
          this.username = "";
          setTimeout(() => {
            this.registerUserErrMsg = false;
          }, 3000);
        } else {
          this.registerUserErrMsg = false;
        }
      });
  }
  emailValidationCheck(val) {
    this.emailValidation(val);
    let list = {
      email: val
    }
    this.homeService.emailCheck(list)
      .subscribe((res) => {
        if (res.code != 200) {
          // alert(res.message);
          this.registerEmailErrMsg = res.message;
          this.email = "";
          setTimeout(() => {
            this.registerEmailErrMsg = false;
          }, 3000);
        } else {
          this.registerEmailErrMsg = false;
        }
      });
  }

  onFailure(error) {
    console.log(error);
  }


  changeLocation() {
    var input = document.getElementById('sellLocate');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      for (var i = 0; i < place.address_components.length; i += 1) {
        var addressObj = place.address_components[i];
        for (var j = 0; j < addressObj.types.length; j += 1) {
          if (addressObj.types[j] === 'locality') {
            var City = addressObj.long_name;
            // console.log(addressObj.long_name);
          }
          if (addressObj.types[j] === 'country') {
            var state = addressObj.short_name;
            // console.log(addressObj.short_name);
          }
        }
      }
      console.log("cityArea", place);
      if (City) {
        $("#cityS").val(City);
      } else if (state) {
        $("#cityS").val(state);
      } else {
        $("#cityS").val(place.formatted_address);
      }
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      $("#latS").val(lat);
      $("#lngS").val(lng);
      $("#state").val(state);
      $("#locate").val(place.formatted_address);
      (City) ? $("#sellLocate").val(City+","+state) : $("#sellLocate").val(state);

    
    });
  }


  selectedLanguage(languageValue){

    console.log("the slected value :",typeof languageValue );
    sessionStorage.setItem("Language",languageValue)
    switch(languageValue){
     
      case '1':this.header = this._lang.engHeader1;
               break; 

      case '2':this.header = this._lang.engHeader;
               break;
    }
    // sessionStorage.setItem("Languages",'1');
    // this._router.navigate(['./about']);
    window.location.reload();
  }

}
