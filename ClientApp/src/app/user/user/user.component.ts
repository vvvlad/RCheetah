import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params['userName']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     console.log(error);
  //     this.snack.open('User pull error', error, {duration: 4000});
  //   });

  // }

}
