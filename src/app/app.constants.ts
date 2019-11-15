import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Headers } from '@angular/http';
declare var Buffer: any;
@Injectable()
export class Configuration {
    Server: string = 'https://bingalo.com/';
    ApiUrl: string = 'api/';
    Url = this.Server + this.ApiUrl;

    authPassword = '&jno-@8az=wSo*NHYVGpF^AQ?4yn36ZvW5ToUCUN+XGOuC?sz#SE$oxXVbwQGP|3WFyjcTAj2SIRQnLE|vo^-|-ATV5FZUf2*5A3Oiu|_EOMmG==&iApzQL3R7HHQj?jtb0mc2mT$Y%Isrgrxveld#Z^g3-ul^|0xAITganIuF23J0waSa6z6aP_+%De5LqtuY&ptx?qhZySECdyE^*4R^b*hFjQ-9?cCSJNfROzztEYbRyN=SqDyhhpzSmmP|Eb';
    auth = 'Basic ' + new Buffer("basicAuth:" + this.authPassword).toString('base64');
    // token = localStorage.getItem('user') || '';

    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor() {
        // this.headers.append('token', this.token);
        this.headers.append('authorization', this.auth);
    }

    setItem(item, val) {
        // try {
        //     localStorage.setItem(item, val);
        // } catch (exception) {
        // this[item] = val;      
        Cookie.set(item, val, 1, "/");
        // }
    }
    getItem(item) {
        // try {
        //     return localStorage.getItem(item);
        // } catch (exception) {
        // return this[item];
        return Cookie.get(item);
        // }
    }

    removeItem(item) {
        // try {
        //     localStorage.removeItem(item);
        // } catch (exception) {
        // return this[item];
        Cookie.delete(item, "/");
        // }
    }

    clear() {
        // try {
        //     localStorage.clear();
        // } catch (exception) {
        //  Cookie.clear();
        Cookie.deleteAll("/");
        // }
    }

}