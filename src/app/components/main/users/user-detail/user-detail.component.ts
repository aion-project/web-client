import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SelectRoleComponent } from './select-role/select-role.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  private userId: String
  
  user: any = []
  isAdmin: boolean = false

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.myRoles().pipe(first()).subscribe((roles: any[]) => {
      if (roles.some(role => role == "Admin"))
        this.isAdmin = true
    })
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.userId = map.get("userId")
      this.fetchUserInfo()
    })
  }

  onRoleAdd() {
    const dialogRef = this.dialog.open(SelectRoleComponent, {
      width: '320px',
      data: { roleName: null, currentRoles: this.user.roles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addRole(this.userId, result).toPromise().then(_ => {
          this.fetchUserInfo()
        })
      }
    });
  }

  onRoleRemove(roleName) {
    this.userService.removeRole(this.userId, roleName).toPromise().then(_ => {
      this.fetchUserInfo()
    })
  }

  fetchUserInfo() {
    this.userService.get(this.userId).pipe(first()).subscribe(user => {
      this.user = user
    })
  }
}
