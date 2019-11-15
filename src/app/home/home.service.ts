import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { MissionService } from '../app.service';
import 'rxjs/Rx';

declare var $:any;

@Injectable()
export class HomeService {
    serverError: string;
    responseData:any;
    constructor(private _http: Http, private _conf: Configuration, private missionService: MissionService) {

    }

    seoList(list) {
        let body = list;
        console.log(body);
        return this._http.get(this._conf.Url + 'homeSEO?type=' + list.type, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("homeSEO", res);
                return res;
            })
    }

    getIpAddress() {        
    //    return  $.get("https://ipapi.co/json/", function(response) {
    //         this.responseData = response;
    //         console.log("the ipinfo ", this.responseData );
    //         }, "jsonp")
        return this._http.get('https://ipapi.co/json/', { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("ipinfo", res);
                return res;
            })
      }

    homeAllList(list) {
        let tokenAuth = this._conf.getItem('authToken');
        // console.log(tokenAuth)
        if (tokenAuth) {
            var body = list;
            body.token = tokenAuth;
            var Url = this._conf.Url + 'allPosts/users/';
        } else {
            var body = list;
            var Url = this._conf.Url + 'allPosts/guests/';
        }
        console.log(body);

        return this._http.post(Url, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("users, guests", res);
                return res;
            })
    }

    homeAllUserList(list) {
        let body = list;
        console.log(body);
        return this._http.post(this._conf.Url + 'allPosts/users/', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("allPosts/users/", res);
                return res;
            })
    }

    searchCategoriesList(list) {
        let body = list;
        console.log(body);
        return this._http.post(this._conf.Url + 'searchFilter/staging', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("searchFilter/staging", res);
                return res;
            })
    }

    getCategoriesList() {
        // let body = list;
        // console.log('getCategoriesList', body);
        let limit = 40;
        let offset = 0;

        return this._http.get(this._conf.Url + 'getCategories?limit=' + limit + '&offset=' + offset, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                // this.missionService.confirmServer(this.serverError);
                console.log("getCategoriesList", res);
                return res;
            }).catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error, "error connection");
        // this.missionService.confirmServer(this.serverError);
        return Observable.throw(error.json().error || 'Server error');
    }

    sellList(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'websiteSell', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                // this.missionService.confirmServer(this.serverError);
                console.log("websiteSell", res);
                return res;
            })
    }

    loginYelo(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'login', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("login", res);
                return res;
            })
    }

    logDeviceYelo(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'logDeviceWebsite', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("logDevice", res);
                return res;
            })
    }

    registerYelo(list) {

        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'register', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("register", res);
                return res;
            })
    }

    emailCheck(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'emailCheck', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("emailCheck", res);
                return res;
            })
    }

    phoneNumberCheck(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'phoneNumberCheck', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("phoneNumberCheck", res);
                return res;
            })
    }

    userNameCheck(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'usernameCheck', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("usernameCheck", res);
                return res;
            })
    }

    resetPwd(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'resetPassword', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("resetPassword", res);
                return res;
            })
    }

    otpCheck(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'otp', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("otp", res);
                return res;
            })
    }

    verifyOtp(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'verify-otp', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("verify-otp", res);
                return res;
            })
    }


    postProduct(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'product/v2', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("product/v2", res);
                return res;
            })
    }

    postEditProduct(list) {
        let body = list;
        console.log(body);

        return this._http.put(this._conf.Url + 'product/v2', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("product/v2", res);
                return res;
            })
    }

    postDeleteProduct(token, postId) {
        // let body = list;
        // console.log(body);

        return this._http.delete(this._conf.Url + 'product/v2?postId=' + postId + "&token=" + token, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("product/v2", res);
                return res;
            })
    }


}