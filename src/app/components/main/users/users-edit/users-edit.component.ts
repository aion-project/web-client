import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { first, filter } from 'rxjs/operators';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  editForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    bio: new FormControl('')
  });

  error: any;
  isProfile = false;
  isLoading = false;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<UsersEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isProfile = this.data == null;
    const fetchMeObservable = this.isProfile ?
      this.userService.me().pipe(
        filter(user => user != null),
        first(),
      ) : this.userService.get(this.data).pipe(first());
    fetchMeObservable.subscribe((user: any) => {
      this.user = user;
      this.editForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio != null ? user.bio : ''
      });
    });
  }

  onSubmit() {
    if (this.user == null) {
      return;
    }

    const firstname = this.editForm.controls.firstName.value as string;
    const lastname = this.editForm.controls.lastName.value as string;
    const email = this.editForm.controls.email.value as string;
    const bio = this.isProfile ? this.editForm.controls.bio.value as string : this.user.bio;
    this.isLoading = true;
    this.userService.update(this.user.id, firstname, lastname, email, bio).subscribe((res: any) => {
      this.isLoading = false;
      this.dialogRef.close(true);
    }, (err) => {
      if (err instanceof HttpErrorResponse && err.error.msg) {
        this.error = err.error.msg;
      } else {
        this.error = err.toString();
      }
      console.log(err);
      this.isLoading = false;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
