import { Component, OnInit,Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() public UserName:string = "";
  title = 'app works!';
  ngOnInit() {
    $("html, body").animate({ scrollTop: 0 }, 500);
  }
  responsOfUserName(event){
    this.UserName = event;
    console.log("the user Name is :",this.UserName );
  }
}


