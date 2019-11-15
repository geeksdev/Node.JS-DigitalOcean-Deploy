import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';


@Injectable()
export class ChangePasswordService {

    constructor(private _http: Http, private _conf: Configuration) {

    }

    changePassword(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'password-update', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("changePassword", res);
                return res;
            })
    }


    resetChangePassword(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'changepassword', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("changepassword", res);
                return res;
            })
    }

    verifyEmail(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'check_mail', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("check_mail", res);
                return res;
            })
    }
    

}