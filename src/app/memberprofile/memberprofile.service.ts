import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';


@Injectable()
export class MemberProfileService {

    constructor(private _http: Http, private _conf: Configuration) {

    }

    memberProfileList(list) {

        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'profile/' + list.membername, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("profile/membername", res);
                return res;
            })
    }

    followersPostList(list) {

        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'follow/' + list.userNameToFollow, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("follow", res);
                return res;
            })
    }

    unfollowPostList(list) {

        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'unfollow/' + list.userNameToFollow, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("follow", res);
                return res;
            })
    }


    getFollowersPostList(list) {

        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'getMemberFollowers', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getMemberFollowers", res);
                return res;
            })
    }



}