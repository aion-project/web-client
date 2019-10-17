import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  isAdmin: boolean
  currentUser: any
  displayedColumns: string[] = ['name','description']
  displayedData: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
    this.userService.myRoles().pipe(first()).subscribe((roles: any[]) => {
      if (roles.some(role => role.name == "admin"))
        this.isAdmin = true
    })
    this.fetchResources()
  }

  // create() {
  //   const dialogRef = this.dialog.open(LocationCreateEditComponent, {
  //     width: '640px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.fetchLocations();
  //     }
  //   });
  // }

  fetchResources() {
    this.resourceService.getAll().pipe(first()).subscribe(resource => {
      this.displayedData = resource
    })
  }
}

