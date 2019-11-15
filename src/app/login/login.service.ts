import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';


@Injectable()
export class LoginService {

    constructor(private _http: Http, private _conf: Configuration) {

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

    fbRegisterYelo(list) {
        let body = list;
        console.log(body);        

        return this._http.post(this._conf.Url + 'register', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("fbregister", res);
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

    usernameCheck(list) {
        let body = list;
        console.log(body);        

        return this._http.post(this._conf.Url + 'usernameCheck', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("usernameCheck", res);
                return res;
            })
    }


}