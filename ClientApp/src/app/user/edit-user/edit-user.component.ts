import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  updateForm: FormGroup;
  // Prevent from navigating from a page on browser level
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.updateForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.user = data['user'];
    });
    this.updateForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, {validators: [Validators.required]}),
      lastName: new FormControl(this.user.lastName, {validators: [Validators.required]}),
      country: new FormControl(this.user.country, {validators: [Validators.required]})
    });
  }

  updateUser() {

    this.userService.updateUser(this.authService.decodedToken.unique_name, this.updateForm.value).subscribe(next => {
      this.updateForm.reset(this.updateForm.value);
      const snackRef = this.snack.open('Success', 'User details were updated', {duration: 4000, panelClass: ['snack-bar-color-ok']});
                snackRef.onAction().subscribe(() => {
                    console.log('clicked on action');
                });

    }, error => {
      this.snack.open('Failure', 'Failed to update user details' + error.details, {duration: 4000, panelClass: ['snack-bar-color-ok']});
    });
  }

}
