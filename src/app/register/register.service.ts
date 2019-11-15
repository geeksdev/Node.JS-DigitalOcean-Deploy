import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';


@Injectable()
export class RegisterService {

    constructor(private _http: Http, private _conf: Configuration) {

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

    fbLoginYelo(list) {
        let body = list;
        // console.log(body);        

        return this._http.post(this._conf.Url + 'login', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("login", res);
                return res;
            })
    }

    logDeviceYelo(list) {
        let body = list;
        // console.log(body);        

        return this._http.post(this._conf.Url + 'logDeviceWebsite', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("logDevice", res);
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

    verifyEmail(list) {
        let body = list;
        console.log(body);
        console.log(this._conf.Url + 'email/me?authToken=' + list.authToken + '&verificationToken=' + list.verificationToken);

        return this._http.get(this._conf.Url + 'email/me?authToken=' + list.authToken + '&verificationToken=' + list.verificationToken, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("email/me", res);
                return res;
            })
    }


}