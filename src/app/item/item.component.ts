import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../app.service';
import { ItemService } from './item.service';
import { HomeService } from '../home/home.service';
import { Configuration } from '../app.constants';
import { LanguageService } from '../app.language';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

declare var $: any;
declare var google: any;
declare var FB: any;
declare var moment: any;


declare interface Window {
  adsbygoogle: any[];
}
declare var adsbygoogle: any[];

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
    private _meta: Meta,
    private _conf: Configuration,
    private route: ActivatedRoute,
    private _router: Router,
    private homeService: HomeService,
    private _service: ItemService,
    private _lang: LanguageService) { }

  headerOpen: string;
  postId: any;
  itemList: any;
  allListYelo = false;
  token: any;
  followers: any;
  followOpen = false;
  loginUsername: any;
  otherOffer: any;
  offerListLength: any;
  reportList: any;
  reportReasonList: any;
  reportDes: any;
  reportDescription: any;
  reportErr: any;
  offset = 40;
  limit = 0;
  makeOfferPrice: string;
  offerSent = false;
  lengthTextarea: any;
  listComments = false;
  commentMsg: any;
  textAreaMsg: any;
  allComment = false;
  sellEmail: string;
  sellPhone: string;
  email_Error = false;
  phone_Error = false;
  registerSave = false;
  PEerror: any;
  succesSeller = false;
  howPopupSuccess = false;
  postListImg = false;
  listSell: any;
  item: any
  successReport: any;
  postEdit: any;
  catList: any;

  loaderButton = false;
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

  ngOnInit() {
    this.uploader.onSuccessItem = this.imageUploader;
    // this.item = this._lang.engItem;
    this.uploader.onSuccessItem = this.imageUploader;
    // this.item = this._lang.engItem;
    // let selectedLang  = Number(this._conf.getItem("Language"));
    let selectedLang  = Number(sessionStorage.getItem("Language"));
    if(selectedLang){
      switch(selectedLang){

        case 1:  this.item = this._lang.engItem1;
                          break;

        case 2:  this.item = this._lang.engItem;
                break;
      }
    }
    else{
      this.item = this._lang.engItem;
    }

    $(window).on('popstate', function () {
      $('.modal').modal('hide');
    });
    this._missionService.confirmheaderOpen(this.headerOpen);
    FB.init({
      appId: '895123320630756',
      cookie: false,
      xfbml: true,
      version: 'v2.7'
    });
    this.token = this._conf.getItem('authToken');
    this.loginUsername = this._conf.getItem('username');

    this.route.params.subscribe(params => {
      if (params['id'] == '1510560388842') {
        var script = document.createElement("script");
        script.src = "https://d2qb2fbt5wuzik.cloudfront.net/yelowebsite/js/rating.json";
        script.type = "application/ld+json";
        document.body.appendChild(script);
      }
      this.postId = params['id'];
      if (this.postId && !this.token) {
        let Id = {
          postId: this.postId
        }
        this._service.guestPostList(Id)
          .subscribe((res) => {
            this.allListYelo = true;
            this.itemList = res.data[0];
            // console.log("ddd", this.itemList.seoKeyword)
            this._meta.addTag({ name: 'keywords', content: this.itemList.seoKeyword })
            this._meta.addTag({ name: 'description', content: this.itemList.seoDescription })
            this._meta.addTag({ name: 'title', content: this.itemList.seoTitle })
            this.hashtagFunction();
            this.timeFunction();
            this.locationMap();
            this.myOtherGuestOffers();
            if (res.code == 204) {
              this.postListImg = true;
            } else {
              this.postListImg = false;
            }
          });
      } else {
        let list = {
          token: this.token,
          postId: this.postId,
          latitude: "12.972442",
          longitude: "77.580643",
          city: "bengaluru",
          countrySname: "in"
        }
        this.homeService.getIpAddress()
          .subscribe((res) => {
            console.log(res)
            let ipList = res.loc.split(",");
            list.latitude = String(ipList[0]);
            list.longitude = String(ipList[1]);
            list.city = res.city;
            list.countrySname = res.country;
          })
        // console.log(list);
        this._service.userPostList(list)
          .subscribe((res) => {
            this.allListYelo = true;
            if (res.code == 200) {
              this.itemList = res.data[0];
              // console.log("ddd", this.itemList.seoKeyword)
              this._meta.addTag({ name: 'keywords', content: this.itemList.seoKeyword })
              this._meta.addTag({ name: 'description', content: this.itemList.seoDescription })
              this._meta.addTag({ name: 'title', content: this.itemList.seoTitle })
              this.hashtagFunction();
              this.timeFunction();
              if (this.itemList.commentData.length > 0) {
                this.commentTimeFunction();
              }
              this.locationMap();
              this.getFollowers(this.itemList);
              this.myOtherUserOffers();
            }
            if (res.code == 204) {
              this._router.navigate([""]);
            }
          });
      }
    });
    this.listGetCategories();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        //  alert(e);
        console.error("error", e);
      }
    }, 2000);
  }


  commentTimeFunction() {
    var len = this.itemList.commentData;
    for (var i = 0; i < len.length; i++) {
      var post = this.itemList.commentData[i].commentedOn;
      var poston = Number(post);
      var postdate = new Date(poston);
      var currentdate = new Date();
      var timeDiff = Math.abs(postdate.getTime() - currentdate.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      var diffHrs = Math.round((timeDiff % 86400000) / 3600000);
      var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);

      if (1 < diffDays) {
        this.itemList.commentData[i].commentedOn = diffDays + "d";
      } else if (1 <= diffHrs) {
        this.itemList.commentData[i].commentedOn = diffHrs + "h";
      } else {
        this.itemList.commentData[i].commentedOn = diffMins + "m";
      }
      // console.log(this.itemList.commentData[i].commentedOn);
      // this.itemList.postedOn = postedOn;
    }
  }

  timeFunction() {
    var post = this.itemList.postedOn;
    var poston = Number(post);
    var postdate = new Date(poston);
    var currentdate = new Date();
    var timeDiff = Math.abs(postdate.getTime() - currentdate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var diffHrs = Math.round((timeDiff % 86400000) / 3600000);
    var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);

    if (1 < diffDays) {
      var postedOn = diffDays + " days";
    } else if (1 <= diffHrs) {
      var postedOn = diffHrs + " hours";
    } else {
      var postedOn = diffMins + " minutes";
    }
    this.itemList.postedOn = postedOn;
  }


  listGetCategories() {
    this.homeService.getCategoriesList()
      .subscribe((res) => {
        if (res.code == 200) {
          this.catList = res.data;
        }
      });
  }

  public currencyList = [
    { value: "USD", text: "United States Dollars" },
    { value: "EUR", text: "Euro" },
    { value: "GBP", text: "United Kingdom Pounds" },
    { value: "DZD", text: "Algeria Dinars" },
    { value: "ARP", text: "Argentina Pesos" },
    { value: "AUD", text: "Australia Dollars" },
    { value: "ATS", text: "Austria Schillings" },
    { value: "BSD", text: "Bahamas Dollars" },
    { value: "BBD", text: "Barbados Dollars" },
    { value: "BEF", text: "Belgium Francs" },
    { value: "BMD", text: "Bermuda Dollars" },
    { value: "BRR", text: "Brazil Real" },
    { value: "BGL", text: "Bulgaria Lev" },
    { value: "CAD", text: "Canada Dollars" },
    { value: "CLP", text: "Chile Pesos" },
    { value: "CNY", text: "China Yuan Renmimbi" },
    { value: "CYP", text: "Cyprus Pounds" },
    { value: "CSK", text: "Czech Republic Koruna" },
    { value: "DKK", text: "Denmark Kroner" },
    { value: "NLG", text: "Dutch Guilders" },
    { value: "XCD", text: "Eastern Caribbean Dollars" },
    { value: "EGP", text: "Egypt Pounds" },
    { value: "FJD", text: "Fiji Dollars" },
    { value: "FIM", text: "Finland Markka" },
    { value: "FRF", text: "France Francs" },
    { value: "DEM", text: "Germany Deutsche Marks" },
    { value: "XAU", text: "Gold Ounces" },
    { value: "GRD", text: "Greece Drachmas" },
    { value: "HKD", text: "Hong Kong Dollars" },
    { value: "HUF", text: "Hungary Forint" },
    { value: "ISK", text: "Iceland Krona" },
    { value: "INR", text: "India Rupees" },
    { value: "IDR", text: "Indonesia Rupiah" },
    { value: "IEP", text: "Ireland Punt" },
    { value: "ILS", text: "Israel New Shekels" },
    { value: "ITL", text: "Italy Lira" },
    { value: "JMD", text: "Jamaica Dollars" },
    { value: "JPY", text: "Japan Yen" },
    { value: "JOD", text: "Jordan Dinar" },
    { value: "KRW", text: "Korea(South) Won" },
    { value: "LBP", text: "Lebanon Pounds" },
    { value: "LUF", text: "Luxembourg Francs" },
    { value: "MYR", text: "Malaysia Ringgit" },
    { value: "MXP", text: "Mexico Pesos" },
    { value: "NLG", text: "Netherlands Guilders" },
    { value: "NZD", text: "New Zealand Dollars" },
    { value: "NOK", text: "Norway Kroner" },
    { value: "PKR", text: "Pakistan Rupees" },
    { value: "XPD", text: "Palladium Ounces" },
    { value: "PHP", text: "Philippines Pesos" },
    { value: "XPT", text: "Platinum Ounces" },
    { value: "PLZ", text: "Poland Zloty" },
    { value: "PTE", text: "Portugal Escudo" },
    { value: "ROL", text: "Romania Leu" },
    { value: "RUR", text: "Russia Rubles" },
    { value: "SAR", text: "Saudi Arabia Riyal" },
    { value: "XAG", text: "Silver Ounces" },
    { value: "SGD", text: "Singapore Dollars" },
    { value: "SKK", text: "Slovakia Koruna" },
    { value: "ZAR", text: "South Africa Rand" },
    { value: "KRW", text: "South Korea Won" },
    { value: "ESP", text: "Spain Pesetas" },
    { value: "XDR", text: "Special Drawing Right(IMF)" },
    { value: "SDD", text: "Sudan Dinar" },
    { value: "SEK", text: "Sweden Krona" },
    { value: "CHF", text: "Switzerland Francs" },
    { value: "TWD", text: "Taiwan Dollars" },
    { value: "THB", text: "Thailand Baht" },
    { value: "TTD", text: "Trinidad and Tobago Dollars" },
    { value: "TRL", text: "Turkey Lira" },
    { value: "VEB", text: "Venezuela Bolivar" },
    { value: "ZMK", text: "Zambia Kwacha" },
    { value: "EUR", text: "Euro" },
    { value: "XCD", text: "Eastern Caribbean Dollars" },
    { value: "XDR", text: "Special Drawing Right(IMF)" },
    { value: "XAG", text: "Silver Ounces" },
    { value: "XAU", text: "Gold Ounces" },
    { value: "XPD", text: "Palladium Ounces" },
    { value: "XPT", text: "Platinum Ounces" }
  ]


  myOtherGuestOffers() {
    let list = {
      postId: this.postId,
      membername: this.itemList.membername,
      latitude: this.itemList.latitude,
      longitude: this.itemList.longitude,
      offset: this.offset,
      limit: this.limit
    }

    this._service.otherOffersGuestPostList(list)
      .subscribe((res) => {
        this.otherOffer = res.data;
        if (this.otherOffer && this.otherOffer.length > 0) {
          this.offerListLength = true;
        } else {
          this.offerListLength = false;
        }
      });
  }


  myOtherUserOffers() {
    let list = {
      token: this.token,
      postId: this.postId,
      membername: this.itemList.membername,
      latitude: this.itemList.latitude,
      longitude: this.itemList.longitude,
      offset: this.offset,
      limit: this.limit
    }

    this._service.otherOffersUserPostList(list)
      .subscribe((res) => {
        this.otherOffer = res.data;
        if (this.otherOffer && this.otherOffer.length > 0) {
          this.offerListLength = true;
        } else {
          this.offerListLength = false;
        }
      });
  }

  watchList(val, label) {
    if (this.token) {
      let list = {
        token: this.token,
        postId: this.postId,
        label: 'Photo'
      }
      if (label == 1) {
        list.label = 'Video';
      }
      if (val == 0) {
        this.itemList.likeStatus = 1;
        this._service.likePost(list)
          .subscribe((res) => {
          });
      } else {
        this.itemList.likeStatus = 0;
        this._service.unlikePost(list)
          .subscribe((res) => {
          });
      }
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }
  }

  searchCategory(val) {
    // this._conf.setItem('categoryName', val.toLowerCase());
    // this._router.navigate(["./search"]);
  }

  itemDetails(id) {
    this._router.navigate(["./item", id]);
  }

  postTextArea(val) {
    this.lengthTextarea = val.length;
  }


  changeImage(val) {
    $(".imgItem").removeClass("active");
    $(".item").removeClass("active");
    $("#" + val + "img").addClass("active");
    $("#" + val).addClass("active");
  }

  InnerCarousel() {
    setTimeout(() => {
      var idx = $('#myCarousel').find('.active').attr("id");
      $(".imgItem").removeClass("active");
      $("#" + idx + "img").addClass("active");
    }, 650);
  }

  getFollowers(name) {
    let list = {
      token: this.token,
      membername: name.membername,
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

  memberProfile(val) {
    // let memberName = val.username;
    $(".modal").modal("hide");
    if (this.token) {
      if (this.loginUsername != val) {
        this._router.navigate(["p", val]);
      } else {
        this._router.navigate(["./settings"]);
      }
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }
  }

  followerButton(val, i) {
    if (this.token) {
      let list = {
        token: this.token,
        userNameToFollow: val
      }
      if (i == undefined) {
        this.itemList.followRequestStatus = 1;
      } else {
        this.followers[i].userFollowRequestStatus = 1;
      }
      this._service.followersPostList(list)
        .subscribe((res) => {
          if (res.code == 200) {
            $("#followItemPopup").modal("show");
          }
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
        this.itemList.followRequestStatus = null;
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

  makeOfferPriceEmpty() {
    this.makeOfferPrice = "";
    this.offerSent = false;
  }

  makeOffer(item) {
    let mqttId = this._conf.getItem('mqttId');
    let username = this._conf.getItem('username');
    let profilePicUrl = this._conf.getItem('profilePicUrl');

    if (!this.makeOfferPrice) {
      this.makeOfferPrice = $(".makeOfferPrice").val();
    }

    if (this.makeOfferPrice) {
      if (this.token && mqttId) {
        var list = {
          token: this.token,
          postId: this.postId,
          offerStatus: '1',
          price: this.makeOfferPrice,
          type: String(item.postType),
          membername: item.membername,
          sendchat: null
        }
        var today = new Date();
        var formattedtoday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var date = moment(formattedtoday).valueOf();

        let itemList = {
          dataSize: "1",
          from: mqttId,
          id: String(date),
          isSold: "0",
          name: username,
          offerType: "1",
          payload: btoa(this.makeOfferPrice),
          productId: String(item.postId),
          productImage: item.mainUrl,
          productName: item.productName,
          productPrice: item.price,
          secretId: String(item.postId),
          thumbnail: item.thumbnailImageUrl,
          to: item.memberMqttId,
          toDocId: String(date),
          type: String(15),
          userImage: profilePicUrl
        }
        list.sendchat = itemList;
        console.log("the make offer list is :", list)
        // console.log(list);
        this._service.makeOfferPostList(list)
          .subscribe((res) => {
            if (res.code == 200) {
              console.log("the make offer is :", res);
              this.offerSent = true;
              $("#makeOffer").modal("hide");
              this.successReport = "Your Offer Has Been Sent";
              $("#successPopup").modal("show");
              this._missionService.confirmSellPopup(this.headerOpen);
              // $("#reportItemPopup").modal("show");
              // setTimeout(() => {
              //   $(".modal").modal("hide");
              // }, 2000);
            }
          });
      } else {
        $("#makeOffer").modal("hide");
        this._missionService.confirmLogin(this.headerOpen);
      }
    }
  }

  sellPopup(){
    if(!this.token){
      console.log(" ask question")
      $("#askItemPopup").modal("hide");
      this._missionService.confirmLogin(this.headerOpen);
    }
    else{
      console.log(" ask question 4")
      this.successReport = "Your Question Has Been Sent";
      $("#successPopup").modal("show");
    }
    // this.successReport = "Your Question Is Sent";
    // $("#successPopup").modal("show");
    // this._missionService.confirmSellPopup(this.headerOpen);
  }

  reportItem() {
    if (this.token) {
      let list = {
        token: this.token
      }
      this._service.reportPostList(list)
        .subscribe((res) => {
          if (res.code == 200) {
            this.reportList = res.data;
            this.reportDes = true;
            this.successReport = "Reported";
            $("#reportItemPopup").modal("show");
          }
        });
    } else {
      this._missionService.confirmLogin(this.headerOpen);
      // this._missionService.confirmLogin(this.headerOpen);
    }
  }

  reportReason(report) {
    this.reportDescription = "";
    this.reportErr = "";
    this.reportDes = false;
    this.reportReasonList = report;
  }

  reportPostItem() {
    let list = {
      token: this.token,
      membername: this.itemList.membername,
      reasonId: this.reportReasonList._id,
      description: this.reportDescription,
      postId: this.postId
    }
    this._service.reportPosting(list)
      .subscribe((res) => {
        this.reportDes = false;
        this.reportList = false;
        this.reportErr = res.messsage;
        if (res.code == 200) {
          setTimeout(() => {
            $(".modal").modal("hide");
          }, 1000);
        }
      });

  }

  commentsList(val) {
    $(".listTap").removeClass("active");
    $("#" + val + "com").addClass("active");
    $("#" + val + val + "com").addClass("active");
    if (val == 1) {
      this.listComments = false;
    } else {
      this.listComments = true;
    }
  }

  allCommentsList() {
    if (this.token) {
      let list = {
        token: this.token,
        postId: this.itemList.postId
      }
      this._service.allCommentPost(list)
        .subscribe((res) => {
          if (res.code == 200) {
            this.allComment = true;
            this.itemList.commentData = res.result;
            this.commentTimeFunction();
            this.hashtagFunction();
          }
        });

    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }
  }


  postCommentSend(type, id) {
    if (this.token) {
      let list = {
        token: this.token,
        postId: id,
        type: type.toString(),
        comment: this.textAreaMsg
      }
      // this.commentMsg.push(list);
      this.textAreaMsg = "";
      this.lengthTextarea = false;
      this._service.commentPost(list)
        .subscribe((res) => {
          this.commentMsg = res.data;
          this.itemList.totalComments += 1;
          this.commentMsg[0].commentData[0].commentedOn = "0m";
          this.itemList.commentData.push(this.commentMsg[0].commentData[0]);
          this.hashtagFunction();
        });
    } else {
      this._missionService.confirmLogin(this.headerOpen);
    }
  }

  hashtagFunction() {
    if (this.itemList.commentData) {
      var len = this.itemList.commentData.length;
      for (var i = 0; i < len; i++) {
        if (this.itemList.commentData) {
          var commenttext = this.itemList.commentData;
          // commenttext.splice(x, 0);
          if (this.itemList.commentData[i].commentBody) {
            var postCommentNodeArr1 = commenttext[i].commentBody;
            // //console.log(postCommentNodeArr1);
            var hashtag_regexp = /#([a-zA-Z0-9_]+)/g;
            var comment_text = postCommentNodeArr1.replace(
              hashtag_regexp,
              '<a href="p/$1" class="color">#$1</a>'
            );
            var hashtag_regexp1 = /@([a-zA-Z0-9_]+)/g;
            var comment_textt = comment_text.replace(
              hashtag_regexp1,
              '<a href="p/$1" class="color">@$1</a>'
            );
            this.itemList.commentData[i].commentBody = comment_textt;
          }
        }
      }
    }
  }

  deleteComment(item, i, type, id) {
    let list = {
      token: this.token,
      commentedByUser: item.commentedByUser,
      commentBody: item.commentBody,
      commentId: item.commentId,
      type: type.toString(),
      postId: id
    }
    this.itemList.commentData.splice(i, 1);
    this._service.deleteCommentPost(list)
      .subscribe((res) => {

      });
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
    this.homeService.sellList(this.listSell)
      .subscribe((res) => {
        if (res.code == 200) {
          this.howPopupSuccess = true;
          this.emptySell();
        } else {
          this.PEerror = res.message;
        }
      });
  }
  imgUrl = [];
  editPost(list) {
    let item = {
      token: this.token,
      postId: list.postId,
      type: list.postType,
      category: list.categoryData[0].category,
      price: list.price,
      currency: list.currency
    }
    this.homeService.postEditProduct(item)
      .subscribe((res) => {
        if (res.code == 200) {
          $(".sellModals").modal("show");
          this.postEdit = res.data[0];
          let imgUrl = [
            { img: this.postEdit.mainUrl, cloudinaryPublicId: this.postEdit.cloudinaryPublicId, containerHeight: this.postEdit.containerHeight, containerWidth: this.postEdit.containerWidth },
            { img: this.postEdit.imageUrl1, cloudinaryPublicId: this.postEdit.cloudinaryPublicId, containerHeight: this.postEdit.containerHeight1, containerWidth: this.postEdit.containerWidth1 },
            { img: this.postEdit.imageUrl2, cloudinaryPublicId: this.postEdit.cloudinaryPublicId, containerHeight: this.postEdit.containerHeight2, containerWidth: this.postEdit.containerWidth2 },
            { img: this.postEdit.imageUrl3, cloudinaryPublicId: this.postEdit.cloudinaryPublicId, containerHeight: this.postEdit.containerHeight3, containerWidth: this.postEdit.containerWidth3 },
            { img: this.postEdit.imageUrl4, cloudinaryPublicId: this.postEdit.cloudinaryPublicId, containerHeight: this.postEdit.containerHeight4, containerWidth: this.postEdit.containerWidth4 }
          ]
          for (var i = 0; i < imgUrl.length; i++) {
            if (imgUrl[i].img) {
              this.imgUrl.push(imgUrl[i]);
            }
          }
          // console.log(this.imgUrl)
        }
      })

  }

  selectCurrency(val) {
    this.postEdit.currency = val;
  }

  selectCondition(val) {
    this.postEdit.condition = val;
  }

  selectCat(val) {
    this.postEdit.category = val;
  }

  switchToggle(val) {
    if (val == true) {
      this.postEdit.negotiable = 1;
    } else {
      this.postEdit.negotiable = 0;
    }
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


  updatePost(list) {
    let city = $("#cityP").val();
    let state = $("#stateP").val();
    let location = $("#locateP").val()
    let lat = $("#latP").val();
    let lang = $("#lngP").val();
    if (this.imgUrl.length > 0 && location) {
      list.token = this.token;
      list.mainUrl = this.imgUrl[0].img;
      list.thumbnailImageUrl = this.imgUrl[0].img;
      list.imageCount = this.imgUrl.length;
      list.containerHeight = this.imgUrl[0].containerHeight;
      list.containerWidth = this.imgUrl[0].containerWidth;
      list.cloudinaryPublicId = this.imgUrl[0].cloudinaryPublicId;
      list.location = location;
      list.latitude = lat;
      list.longitude = lang;
      list.city = city;
      list.countrySname = state;

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
      }, 3000);
      this.homeService.postEditProduct(list)
        .subscribe((res) => {
          this.loaderButton = false;
          if (res.code == 200) {
            this._router.navigate(["./settings"]);
            $(".modal").modal("hide");
          }
        }, err => {
          this.loaderButton = false;
          console.log(err._body)
          var error = JSON.parse(err._body);
          this.errMsg = error.message;
        });
    }

  }

  delPostId: any;
  deletePosts(list) {
    $("#deletePost").modal("show");
    this.delPostId = list.postId;
  }

  deletePost() {
    this.homeService.postDeleteProduct(this.token, this.delPostId)
      .subscribe((res) => {
        if (res.code == 200) {
          $("#deletePost").modal("hide");
          this._router.navigate(["./settings"]);
        }
      })
  }


  changeLocation() {
    var input = document.getElementById('sellLocates');
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
      // console.log("cityArea", place);
      if (City) {
        $("#cityP").val(City);
      } else if (state) {
        $("#cityP").val(state);
      } else {
        $("#cityP").val(place.formatted_address);
      }
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      $("#latP").val(lat);
      $("#lngP").val(lng);
      $("#stateP").val(state);
      $("#locateP").val(place.formatted_address);
    });
  }




  onFacebookLoginClick(): void {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: 'https://developers.facebook.com/docs/',
    }, function (response) {
      console.log(response);
    });
  }


  locationMap() {
    var myLatLng = { lat: parseFloat(this.itemList.latitude), lng: parseFloat(this.itemList.longitude) };
    var mapCanvas = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 15,
      center: myLatLng,
      scrollwheel: false
    });

    setTimeout(() => {
      google.maps.event.trigger(mapCanvas, "resize");
      mapCanvas.setCenter({ lat: parseFloat(this.itemList.latitude), lng: parseFloat(this.itemList.longitude) });
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
    var myLatLng = { lat: parseFloat(this.itemList.latitude), lng: parseFloat(this.itemList.longitude) };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng,
      scrollwheel: false
    });
    setTimeout(() => {
      google.maps.event.trigger(map, "resize");
      map.setCenter({ lat: parseFloat(this.itemList.latitude), lng: parseFloat(this.itemList.longitude) });
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

  filterToggle() {
    // $(".filterRecent").addClass("hide");
    // $(".filterRecentH").addClass("hide");
    // $(".filterRecentF").addClass("hide");
    $("#sideDetailsId").toggleClass('active');
  }

}
