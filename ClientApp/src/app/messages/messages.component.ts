import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private webService: WebService, private route:ActivatedRoute) { }

  ngOnInit() {
    var name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
    // Replaced the below with just direct call from markup with async pipe
    // this.webService.messages.subscribe(messages => {
    //   this.messages = messages;
    // })
  }

}
