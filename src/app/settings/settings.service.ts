import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';


@Injectable()
export class SettingsService {

    constructor(private _http: Http, private _conf: Configuration) {

    }

    editProfile(list) {
        let body = list;
        console.log(body);
        return this._http.post(this._conf.Url + 'editProfile', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("editProfile", res);
                return res;
            })
    }

    saveProfilePost(list) {
        let body = list;
        body.token = this._conf.getItem('authToken');
        body.location = list.place;
        body.website = list.websiteUrl;
        console.log(body);
        return this._http.post(this._conf.Url + 'saveProfile', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("saveProfile", res);
                return res;
            })
    }

    sellingPostList(list, val) {
        if (val == 0) {
            var body = list;
            body.sold = 0;
            var Url = this._conf.Url + 'profile/posts';
        } else if (val == 1) {
            var body = list;
            body.sold = 1;
            var Url = this._conf.Url + 'profile/posts';
        } else {
            var body = list;
            body.membername = this._conf.getItem('username');
            var Url = this._conf.Url + 'likedPosts';
        }
        console.log(body, val, Url);
        return this._http.post(Url, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("selling,buying,likedPosts", res);
                return res;
            })
    }


    followingPostList(list) {

        let body = list;
        console.log('followingPostList=>', body);

        return this._http.post(this._conf.Url + 'getFollowing', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getFollowing", res);
                return res;
            })
    }

    followerPostList(list) {

        let body = list;
        console.log('getFollowers=>', body);

        return this._http.post(this._conf.Url + 'getFollowers', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getFollowers", res);
                return res;
            })
    }

    followersPostListButton(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'follow/' + list.userNameToFollow, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("follow", res);
                return res;
            })
    }

    unfollowPostListButton(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'unfollow/' + list.unfollowUserName, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("follow", res);
                return res;
            })
    }

    facebookPost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'facebook/me', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("facebook/me", res);
                return res;
            })
    }

    googlePost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'google/me', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("google/me", res);
                return res;
            })
    }

    paypalPost(list) {
        let body = list;
        console.log(body);

        return this._http.put(this._conf.Url + 'paypal/me', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("paypal/me", res);
                return res;
            })
    }

    // chekEmailPost(list) {
    //     let body = list;
    //     body.token = this._conf.getItem('authToken');
    //     console.log(body);

    //     return this._http.post(this._conf.Url + 'saveProfile', body, { headers: this._conf.headers })
    //         .map(res => res.json())
    //         .map((res) => {
    //             console.log("saveProfile", res);
    //             return res;
    //         })
    // }

    // verifyEmailPost(list) {
    //     let body = list;
    //     body.token = this._conf.getItem('authToken');
    //     console.log(body);

    //     return this._http.post(this._conf.Url + 'saveProfile', body, { headers: this._conf.headers })
    //         .map(res => res.json())
    //         .map((res) => {
    //             console.log("saveProfile", res);
    //             return res;
    //         })
    // }


}