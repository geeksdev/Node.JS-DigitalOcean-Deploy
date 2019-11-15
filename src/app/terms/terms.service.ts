import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';


@Injectable()
export class TermsService {

    constructor(private _http: Http, private _conf: Configuration) {

    }

    webContent(token, type) {       
        return this._http.get(this._conf.Url + 'getwebContent?token='+token+'&type='+type , { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getwebContent", res);
                return res;
            })
    }

    newsContent(token, offset, limit) {       
        return this._http.get(this._conf.Url + 'newsdetails?token='+token+'&type='+offset+'&limit='+limit , { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("newsContent", res);
                return res;
            })
    }

    helpCategoryContent(token) {       
        return this._http.get(this._conf.Url + 'helpCategory?token='+token, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("helpCategory", res);
                return res;
            })
    }

    faqCategoryContent(token, catId) {       
        return this._http.get(this._conf.Url + 'faqCategoryDetails?token='+token+'&categoryId='+catId, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("faqCategoryDetails", res);
                return res;
            })
    }  

    faqCategoryPoints(token, topicId) {       
        return this._http.get(this._conf.Url + 'faqCategoryPoints?token='+token+'&topicId='+topicId, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("faqCategoryPoints", res);
                return res;
            })
    }

    searchCatPoints(points) {       
        return this._http.get(this._conf.Url + 'searchFaqPoints?points='+points, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("searchFaqPoints", res);
                return res;
            })
    }

    faqCatPoints() {       
        return this._http.get(this._conf.Url + 'faqPoints', { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("faqPoints", res);
                return res;
            })
    }       

}