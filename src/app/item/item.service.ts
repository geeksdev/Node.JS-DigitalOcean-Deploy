import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

    constructor(private _http: Http, private _conf: Configuration) {

    }

    guestPostList(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'getPostsById/guests', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getPostsById/guests", res);
                return res;
            })
    }

    userPostList(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'getPostsById/users', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getPostsById/users", res);
                return res;
            })
    }

    otherOffersGuestPostList(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'myOtherOffers/guest', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("myOtherOffers/guest", res);
                return res;
            })
    }

    otherOffersUserPostList(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'myOtherOffers/user', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("myOtherOffers/user", res);
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

        return this._http.post(this._conf.Url + 'unfollow/' + list.unfollowUserName, body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("follow", res);
                return res;
            })
    }

    makeOfferPostList(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'makeOffer', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("makeOffer", res);
                return res;
            })
    }

    reportPostList(list) {
        return this._http.get(this._conf.Url + 'postReportReason?token=' + list.token, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("postReportReason", res);
                return res;
            })
    }

    reportPosting(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'reportPost', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("reportPost", res);
                return res;
            })
    }

    likePost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'like', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("like", res);
                return res;
            })
    }

    unlikePost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'unlike', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("unlike", res);
                return res;
            })
    }

    commentPost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'comments', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("comments", res);
                return res;
            })
    }

    deleteCommentPost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'deleteCommentsFromPost', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("deleteCommentsFromPost", res);
                return res;
            })
    }

    allCommentPost(list) {
        let body = list;
        console.log(body);

        return this._http.post(this._conf.Url + 'getPostComments', body, { headers: this._conf.headers })
            .map(res => res.json())
            .map((res) => {
                console.log("getPostComments", res);
                return res;
            })
    }


}