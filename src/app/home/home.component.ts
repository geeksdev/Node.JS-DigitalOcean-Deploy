import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../app.service';
import { HomeService } from './home.service';
import { Configuration } from '../app.constants';
import { Meta } from '@angular/platform-browser';
import { LanguageService } from '../app.language';
declare var $: any;
declare var google: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _meta: Meta,
    private _conf: Configuration,
    private _router: Router,
    private _service: HomeService,
    private _lang: LanguageService
  ) {
    _missionService.missionCatName$.subscribe(
      catName => {
        console.log(catName, this.categoryVal)
        if (catName == "1") {
          // if (this.categoryVal.length > 0) {
          //   this.searchCategory();
          // } else {
          $('.radioClass').removeAttr('checked');
          this.categoryVal = [];
          this.catList.forEach(x => {
            x.activeimg = false;
          })
          this.allListPosts();
          // }
        } else {
          this.categoryName = catName;
          this.searchCategory();
        }
      });
  }
  headerClose: string;
  token: string;
  offset = 0;
  limit = 40;
  allList: any = [];
  allListPromoted: any = [];
  allListEmpty: any = [];
  catList: any;
  loadMoreList = false;
  loadMoreListArrow = false;
  allListData = false;
  placelatlng: any;
  recentCity: any;
  listLength: any;
  listsLength = false;
  offsetImg = 100;
  defaultImage = 'assets/images/lazyLoad.png';
  sellEmail: string;
  sellPhone: string;
  email_Error = false;
  phone_Error = false;
  registerSave = false;
  PEerror: any;
  succesSeller = false;
  howPopupSuccess = false;
  listSell: any;
  signUpContent: boolean = true;

  filterPrice = false;
  categoryName: any;
  latlng: any;
  priceOrder = "distanceAsc";
  timeOrder = 0;
  distance = 3000;
  minPrice: any;
  maxPrice: any;
  filterScroll: any;
  postedWithin: any;
  currency: any;
  bannerShow = false;
  loadCateg = false;

  home: any;
  data: any;

  infowindow: any;
  map: any;
  place: any;
  shimmer: any = [];
  ngOnInit() {
    let urlPath = this._conf.getItem("pathname");
    console.log("urlPath", urlPath);
    if (urlPath) {
      let list = urlPath.split("/");
      var index = list.indexOf("website");
      if (index > -1) {
        list.splice(index, 1);
      }
      console.log(list.join('/'));
      let url = list.join('/');
      this._router.navigate([url]);
      this._conf.removeItem("pathname");
    } else {
      // this.home = this._lang.engHome;
      let selectedLang  = Number(sessionStorage.getItem("Language"));
      if(selectedLang){
        switch(selectedLang){
  
          case 1: this.home = this._lang.engHome1;
                  // this.placelatlng = {
                  //   'lat':'44.0165',
                  //   'lng':'21.0059'
                  // }
                  // this._conf.setItem('latlng',JSON.parse(this.placelatlng));
                  break; 
  
          case 2:  this.home = this._lang.engHome;
                  break;
        }
      }
      else{
        this.home = this._lang.engHome;
      }
      this.seo();
      this.placeHolder();
      $(window).on('popstate', function () {
        $('.modal').modal('hide');
      });

      this._missionService.confirmheaderClose(this.headerClose);
      // this._missionService.confirmheaderOpen(this.headerClose);
      this.token = this._conf.getItem('authToken');
      let latlng = this._conf.getItem('latlng');
      let cityArea = this._conf.getItem('cityArea');
      let Location1 = cityArea.split(",");
      let locationChange :any;
      if(Location1.length == 2){
        locationChange = cityArea;
      }
      else if(Location1.length == 1){
        locationChange = cityArea;
      }
      else{
        locationChange =  Location1[Location1.length - 3]+","+Location1[Location1.length - 1];
      }
      // let latlng ;
      // let cityArea ;
      console.log("sdf", cityArea,Location1)
      if (cityArea) {
        console.log("the city and state ========")
        $("#cityAreai").val(cityArea);
        $(".location").text(locationChange);
      }
      if (!latlng) {
        this.currentLocation();
      } else {
        this.allListPosts();
      }
      this.listGetCategories();
      setTimeout(() => {
        let latlng1 = this._conf.getItem('latlng');
        if (!latlng1 || !cityArea) {
          console.log("the city and state ")
          this.latLngNull();
        }
      }, 3000);

      $.getJSON("https://restcountries.eu/rest/v1/alpha/in", (data) => {
        // console.log(data)
        // this.currency = data.currencies[0];
        this.currency = "ILS";
      });
    }
  }
  placeHolder() {
    for (var i = 0; i < 12; i++) {
      this.shimmer.push(i);
    }
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


  latLngNull() {
   
      $.get("https://ipapi.co/json/", (response)=> {
        console.log("===============",response);
        // let ipList = response.loc.split(",");
        this.placelatlng = {
          // 'lat': ipList[0],
          // 'lng': ipList[1]
          'lat': response.latitude,
          'lng': response.longitude
        }
        // let latlng1 = this._conf.getItem('latlng');
        // if (!latlng1) {
          console.log("json", this.placelatlng);
          this._conf.setItem('latlng', JSON.stringify(this.placelatlng));
          this.allListPosts();
        // }
        this.recentCity = response.city + ", " + response.country;
        console.log("the city and state ",this.recentCity )
        this._conf.setItem('recentCity', this.recentCity);
        $("#cityAreai").val(this.recentCity);
        $(".location").text(this.recentCity);
    },"jsonp");
    // this._service.getIpAddress()
    // .subscribe((res) => {
    //   let ipList = res.loc.split(",");
    //   this.placelatlng = {
    //     'lat': ipList[0],
    //     'lng': ipList[1]
    //   }
    //   let latlng1 = this._conf.getItem('latlng');
    //   if (!latlng1) {
    //     console.log("json", this.placelatlng);
    //     this._conf.setItem('latlng', JSON.stringify(this.placelatlng));
    //     this.allListPosts();
    //   }
    //   this.recentCity = res.city + ", " + res.country;
    //   this._conf.setItem('recentCity', this.recentCity);
    //   $("#cityAreai").val(this.recentCity);
    //   $(".location").text(this.recentCity);

    // });
  }

  seo() {
    let list = {
      type: 1
    }
    this._service.seoList(list)
      .subscribe((res) => {
        if (res.code == 200) {
          this.data = res.data;
          // console.log("desc", res.data);
          if (this.data) {
            this._meta.addTag({ name: 'title', content: this.data.title })
            this._meta.addTag({ name: 'description', content: this.data.description })
            this._meta.addTag({ name: 'keywords', content: this.data.keyword.toString() })
          }
        }
      });
  }

  emptyFigure() {
    for (var i = 0; i < 20; i++) {
      this.allListEmpty.push(i);
      // console.log(this.allListEmpty);
    }
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
        console.log("HomeLatLng", this.placelatlng);
        this._conf.setItem('latlng', JSON.stringify(this.placelatlng));
        let latlng = this._conf.getItem('latlng');
        if (latlng) {
          this.allListPosts();
        }
        var latilng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latilng }, (results, status) => {
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
              $("#cityAreai").val(city + ", " + country);
              $(".location").text(city + ", " + country);
              console.log("the city and country",city,country)
              this._conf.setItem('recentCity', city + ", " + country);
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

  itemDetails(postId, name) {
    let replace = name.split(' ').join('-');
    // console.log(replace)
    this._router.navigate(["./", replace, postId]);
  }

  public bgcolor = [
    { 'bgcolor': 'rgb(134, 176, 222)' },
    { 'bgcolor': 'rgb(255, 63, 85)' },
    { 'bgcolor': 'rgb(115, 189, 197)' },
    { 'bgcolor': 'rgb(232, 111, 91)' },
    { 'bgcolor': 'rgb(166, 196, 136)' },
    { 'bgcolor': 'rgb(245, 205, 119)' },
    { 'bgcolor': 'rgb(190, 168, 210)' },
    { 'bgcolor': 'rgb(252, 145, 157)' },
    { 'bgcolor': 'rgb(83, 143, 209)' },
    { 'bgcolor': 'rgb(209, 169, 96)' },
    { 'bgcolor': 'rgb(227, 74, 107)' }
  ]

  listGetCategories() {
    this._service.getCategoriesList()
      .subscribe((res) => {
        if (res.code == 200) {
          this.catList = res.data;
          // for (var i = 0; i < this.catList.length; i++) {
          //   this.catList[i].bgcolor = this.bgcolor[i % 11].bgcolor;
          // }
        }
      });
  }

  loadCat() {
    this.loadCateg = !this.loadCateg;
  }


  allListPosts() {
    this.bannerShow = false;
    let list = {
      latitude: "",
      longitude: "",
      offset: 0,
      limit: this.limit
    }
    this.placelatlng = this._conf.getItem('latlng');
    if (this.placelatlng) {
      this.placelatlng = JSON.parse(this.placelatlng);
      list.latitude = this.placelatlng.lat;
      list.longitude = this.placelatlng.lng;
    }

    if (this.offset == 0) {
      this.allListData = false;
      setTimeout(() => {
        this.allListData = true;
      }, 3000);
      this.allList = [];
      this.allListPromoted = [];
    }
    this._service.homeAllList(list)
      .subscribe((res) => {
        this.allListData = true;
        let allList = res.data;
        if (res.code == 200) {
          for (var i = 0; i < allList.length; i++) {
            this.allList.push(res.data[i]);
            if (res.data[i].isPromoted == 1) {
              this.allListPromoted.push(res.data[i]);
            }
          }
          if (this.allList && this.allList.length > 0) {
            this.listsLength = false;
          } else {
            this.listsLength = true;
            this.allListData = true;
          }
          this.listLength = this.allList.length;
          this.filterScroll = 0;
        } else {
          this.listsLength = true;
          this.allListData = true;
        }
      });
  }

  onScroll() {
    if (this.listLength == 40 && this.filterScroll == 0) {
      this.offset += 40;
      console.log("allScroll", this.listLength);
      this.allListPosts();
    } else if (this.listLength == 40 && this.filterScroll == 1) {
      this.offset += 40;
      console.log("filterScroll", this.listLength);
      this.searchCategory();
    } else {
      console.log("error", this.listLength);
    }
  }

  emailValidation(value) {
    this.PEerror = false;
    if (value.length > 5) {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(value)) {
        this.email_Error = false;
        this.registerSave = true;
      } else {
        this.email_Error = true;
        this.registerSave = false;
      }
    } else {
      this.email_Error = false;
    }
  }

  mobileValidation(value) {
    this.PEerror = false;
    if (value.length > 5) {
      var regexPhone = /^(\+91-|\+91|0)?\d{10}$/;
      if (value.match(regexPhone)) {
        this.phone_Error = false;
        this.registerSave = true;
      } else {
        var val = value.replace(/([^+0-9]+)/gi, '')
        this.sellPhone = val;
        this.phone_Error = true;
        this.registerSave = false;
      }
      if (value.length == 10) {
        this.phone_Error = true;
        this.registerSave = false;
      }
    } else {
      this.phone_Error = false;
    }
  }

  sellHowSend() {
    console.log(this.sellEmail, this.sellPhone);
    if (this.sellEmail && this.sellPhone) {
      this.howPopupSuccess = false;
      this.phone_Error = false;
      this.email_Error = false;
      this.PEerror = "Please try anyone";
      setTimeout(() => {
        this.PEerror = false;
      }, 3000);
    } else if (this.sellEmail || this.sellPhone) {
      if (this.sellEmail) {
        this.sellSend(1);
      } else {
        this.sellSend(2);
      }
      this.PEerror = false;
    }
  }

  emptySell() {
    this.sellPhone = "";
    this.sellEmail = "";
    this.email_Error = false;
    this.phone_Error = false;
  }

  sellSend(val) {
    this.email_Error = false;
    this.phone_Error = false;
    if (val == 1) {
      this.listSell = {
        type: "1",
        emailId: this.sellEmail
      }
    } else {
      this.listSell = {
        type: "2",
        phoneNumber: this.sellPhone
      }
    }
    // console.log(this.listSell);
    this._service.sellList(this.listSell)
      .subscribe((res) => {
        if (res.code == 200) {
          this.howPopupSuccess = true;
          this.emptySell();
        } else {
          this.PEerror = res.message;
        }
      });
  }

  // changeLocation() {
  //   var input = document.getElementById('changeLocationId');
  //   var autocomplete = new google.maps.places.Autocomplete(input);

  //   autocomplete.addListener('place_changed', function () {
  //     var place = autocomplete.getPlace();
  //     for (var i = 0; i < place.address_components.length; i += 1) {
  //       var addressObj = place.address_components[i];
  //       for (var j = 0; j < addressObj.types.length; j += 1) {
  //         if (addressObj.types[j] === 'locality') {
  //           var City = addressObj.long_name;
  //           // console.log(addressObj.long_name);
  //         }
  //         if (addressObj.types[j] === 'administrative_area_level_1') {
  //           var state = addressObj.short_name;
  //           // console.log(addressObj.short_name);
  //         }
  //       }
  //     }
  //     // console.log("cityArea", City + ", " + state);
  //     if (City) {
  //       $("#cityAreai").val(City + ", " + state);
  //     } else if (state) {
  //       $("#cityAreai").val(state);
  //     } else {
  //       $("#cityAreai").val(place.formatted_address);
  //     }
  //     let lat = place.geometry.location.lat();
  //     let lng = place.geometry.location.lng();
  //     $("#lati").val(lat);
  //     $("#lngi").val(lng);
  //   });
  // }

  // locationChange() {
  //   setTimeout(() => {
  //     this.offset = 0;
  //     this.searchCategory();
  //   }, 500);
  // }

  milesDistance(val) {
    var input = $(".slider_range").val();
    var value = (input - $(".slider_range").attr('min')) / ($(".slider_range").attr('max') - $(".slider_range").attr('min'));
    $(".slider_range").css('background-image',
      '-webkit-gradient(linear, left top, right top, '
      + 'color-stop(' + value + ', #0d71ba), '
      + 'color-stop(' + value + ', #C5C5C5)'
      + ')'
    );
    this.offset = 0;
    if (val == 50) {
      val = 3000;
    }
    this.distance = val;
    if (val != 0) {
      this.searchCategory();
    } else {
      this.allListPosts();
    }
  }

  signUpContentToggle() {
    this.signUpContent = !this.signUpContent;
  }

  postedWithinList(val) {
    // window.location.reload();
  //   let radioButton = document.getElementsByClassName('radioClass');
  //   radioButton.forEach((item) => {
  //     if (item !== checkbox) item.checked = false
  // })
  
  //To check respective posted values are checked or not
    $('input.checkBoxExample').on('change', function() {
      if(!$("#"+val).is(':checked')){
        window.location.reload();
      }
      $('input.checkBoxExample').not(this).prop('checked', false);  
    });
    if (val == 0) {
      // $('.radioClass').removeAttr('checked');
      this.categoryVal = [];
      this.catList.forEach(x => {
        x.activeimg = false;
      })
      $("html, body").animate({ scrollTop: 0 }, 500);
      $("#sideDetailsId").toggleClass('active');
      $("body").toggleClass("hideHidden");
      this.allListPosts();
    } else if (val == 10) {
      $('.radioClass').removeAttr('checked');
      this.categoryVal = [];
      this.catList.forEach(x => {
        x.activeimg = false;
      })
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      this.offset = 0;
      this.postedWithin = val;
      this.searchCategory();
      $("html, body").animate({ scrollTop: 0 }, 500);
    }
  }

  filterToggle() {
    $("html, body").animate({ scrollTop: 0 }, 500);
    $("#sideDetailsId").toggleClass('active');
    $("body").toggleClass("hideHidden");
  }

  sortPrice(val) {
    this.offset = 0;
    this.priceOrder = val;
    $('input.SortChecked').on('change', function() {
      if(!$("#"+val).is(':checked')){
        window.location.reload();
      }
      $('input.SortChecked').not(this).prop('checked', false);  
    });
    // window.location.reload();
    this.searchCategory();
  }

  numberDitchit(value) {
    var regexPhone = /^(\+91-|\+91|0)?\d{10}$/;
    var val = value.replace(/([^+0-9]+)/gi, '');
    $(".from1").val(val);
  }

  numberDitchit1(value) {
    var regexPhone = /^(\+91-|\+91|0)?\d{10}$/;
    var val = value.replace(/([^+0-9]+)/gi, '');
    $(".to1").val(val);
  }

  minimumPrice(val) {
    this.offset = 0;
    this.minPrice = val;
    this.searchCategory();
  }

  maximumPrice(val) {
    this.offset = 0;
    this.maxPrice = val;
    this.searchCategory();
  }

  selectCurrency(val) {
    this.currency = val;
    this.searchCategory();
  }

  categoryVal = [];
  catArray = [];
  searchCategoryName(val, i) {
    var index = this.categoryVal.indexOf(val.toLowerCase());
    if (index == -1) {
      this.catList[i].activeimg = true;
      this.categoryVal.push(val.toLowerCase());
    } else {
      this.catList[i].activeimg = false;
      this.categoryVal.splice(i, 1);
      window.location.reload();
    }
    // this.catArray = [];
    // for (var k = 0; k < this.catList.length; k++) {
    //   if (this.catList[k].activeimg == true) {
    //     this.catArray.unshift(this.catList[k]);
    //   } else {
    //     this.catArray.push(this.catList[k])
    //   }
    // }
    // setTimeout(() => {
    //   this.catList = this.catArray;
    // }, 300);   
    // console.log(this.catArray);
    this.categoryName = this.categoryVal.toString();
    this.filterPrice = false;
    this.offset = 0;
    this.searchCategory();
  }

  searchCategory() {
    this.bannerShow = true;
    // $("html, body").animate({ scrollTop: 150 }, 500);
    let ltlg = {
      lat: $("#lati").val(),
      lng: $("#lngi").val()
    }
    if ($("#lati").val()) {
      this._conf.setItem('latlng', JSON.stringify(ltlg));
    }
    let ciSt = $("#cityAreai").val();
    if (ciSt) {
      this.recentCity = ciSt;
    }

    let list = {
      token: this.token,
      offset: this.offset,
      limit: this.limit,
      searchKey: "",
      location: "",
      latitude: "",
      longitude: "",
      currency: this.currency,
      postedWithin: this.postedWithin,
      sortBy: this.priceOrder,
      distance: this.distance,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    }
    if (this.categoryName) {
      list.searchKey = this.categoryName;
    }
    let latlng = this._conf.getItem('latlng');
    if (latlng) {
      let latlng = JSON.parse(this._conf.getItem('latlng'));
      list.latitude = latlng.lat;
      list.longitude = latlng.lng;
    }
    if (this.recentCity) {
      list.location = this.recentCity;
    } else {
      list.location = this._conf.getItem('recentCity')
    }

    if (this.offset == 0) {
      this.allListData = false;
      setTimeout(() => {
        this.allListData = true;
      }, 3000);
      this.allList = [];
    }

    this._service.searchCategoriesList(list)
      .subscribe((res) => {
        this.allListData = true;
        let allList = res.data;
        if (res.code == 200) {
          for (var i = 0; i < allList.length; i++) {
            this.allList.push(res.data[i])
          }
          if (this.allList && this.allList.length > 0) {
            this.listsLength = false;
          } else {
            this.listsLength = true;
            this.allListData = true;
          }
          this.listLength = this.allList.length;
          this.filterScroll = 1;
        } else {
          this.listsLength = true;
          this.allListData = true;
        }
      });

  }

  setCurrentLocation() {
    console.log("the navigator 111")
    if (navigator.geolocation) {
      console.log("the navigator 111000")
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.placelatlng = {
          'lat': lat,
          'lng': lng
        }
        console.log("your current location is :",this.placelatlng);
        this._conf.setItem('latlng', JSON.stringify(this.placelatlng));
        this.checkLocation();
      });
    }
  }


  checkLocation() {
    let latlng = this._conf.getItem("latlng");
    console.log(latlng)
    if (latlng) {
      this.latlng = JSON.parse(this._conf.getItem("latlng"));
      $("#locationMap").modal("show");
      this.continueMap();
    }
  }

  changeLocation() {
    var input = document.getElementById('changeLocationId');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      console.log("the place is :",place)
      for (var i = 0; i < place.address_components.length; i += 1) {
        var addressObj = place.address_components[i];
        for (var j = 0; j < addressObj.types.length; j += 1) {
          if (addressObj.types[j] === 'locality') {
            var City = addressObj.long_name;
            // console.log(addressObj.long_name);
          }
          if (addressObj.types[j] === 'country') {
            var Country = addressObj.long_name;
            // console.log(addressObj.long_name);
          }
          if (addressObj.types[j] === 'administrative_area_level_1') {
            var state = addressObj.short_name;
            // console.log(addressObj.short_name);
          }
        }
      }
      // console.log("cityArea", City + ", " + state);
      if (City) {
        $("#cityAreai").val(City + ", " + state);
      } else if (state) {
        $("#cityAreai").val(state);
      } else {
        $("#cityAreai").val(place.formatted_address);
      }
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      $("#lati").val(lat);
      $("#lngi").val(lng);
      (City) ? $("#changeLocationId").val(City+","+Country) :  $("#changeLocationId").val(Country);
    });
  }

  locationChange1() {
    
    this._conf.setItem('cityArea', $("#cityAreai").val());
    setTimeout(() => {
      this.offset = 0;
      this.searchCategory();
    }, 500);
  }


  locationChange() {
    setTimeout(() => {
      let lat = $("#lati").val();
      let lng = $("#lngi").val();
      this.latlng = {
        lat: lat,
        lng: lng
      }
      this.continueMap();
    }, 500);
  }


  continueMap() {
    var latlng = this.latlng;
    let addressLocation =[];
    let location = "";
    var map = new google.maps.Map(document.getElementById('mapData'), {
      center: { lat: parseFloat(latlng.lat), lng: parseFloat(latlng.lng) },
      zoom: 15,
      disableDefaultUI: true,
      mapTypeControl: true
    });

    setTimeout(() => {
      google.maps.event.trigger(map, "resize");
      map.setCenter(latlng);
      var marker = new google.maps.Marker({
        map: map,
      });
    }, 300);

    this.infowindow = new google.maps.InfoWindow();
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: new google.maps.LatLng(latlng.lat, latlng.lng),
      radius: Math.sqrt(50) * 50,
      draggable: true
    });
    var marker = new google.maps.Marker({
      // position: new google.maps.LatLng(latlng.lat, latlng.lng),
      map: map,
      // anchorPoint: new google.maps.Point(0, -29),
      // draggable: true
    });

    var latlng = new google.maps.LatLng(latlng.lat, latlng.lng);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log("the change location ",results[0]);
          addressLocation = results[0].formatted_address.split(",");
          if(addressLocation.length <= 2){
            location = results[0].formatted_address;
          }
          else if(typeof addressLocation[addressLocation.length - 3] != "undefined" || addressLocation[addressLocation.length - 3] != ""){
            location = addressLocation[addressLocation.length - 3] +","+addressLocation[addressLocation.length - 1];
            console.log("ppppppppppppppp")
          }
          else{
            location = addressLocation[addressLocation.length - 1];
            console.log("pppppppp0000000000000")
          }
          console.log("the address format ",addressLocation[addressLocation.length - 3]);
          $(".addressArea").val(results[0].formatted_address);
          $(".location").text(location);
          $("#cityAreai").val(results[0].formatted_address);
          $("#changeLocationId").val(location);
          // $("#cityAreai").val(addressLocation[addressLocation.length - 3]);
          // $(".location").text(results[0].formatted_address);
          // $(".areaName").val(results[0].formatted_address);
          // $(".arealat").val(latlng.lat);
          // $(".arealng").val(latlng.lng);
        }
      }
    });


    var geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(cityCircle, 'dragend', () => {

      geocoder.geocode({ 'latLng': cityCircle.getCenter() }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            addressLocation = results[0].formatted_address.split(",");
            if(addressLocation.length <= 2){
              location = results[0].formatted_address;
            }
            else if(typeof addressLocation[addressLocation.length - 3] != "undefined" || addressLocation[addressLocation.length - 3] != ""){
              location = addressLocation[addressLocation.length - 3] +","+addressLocation[addressLocation.length - 1];
              console.log("ppppppppppppppp")
            }
            else{
              location = addressLocation[addressLocation.length - 1];
              console.log("pppppppp0000000000000")
            }
            console.log("the change location is :",results[0] );
            $("#lati").val(marker.getPosition().lat());
            $("#lngi").val(marker.getPosition().lng());
            $(".location").text(location);
            $("#cityAreai").val(results[0].formatted_address);
            $(".addressArea").val(results[0].formatted_address);
            this.infowindow.setContent(results[0].formatted_address);
            this.infowindow.open(map, marker);

          }
        }
      });
    });
  }

}
