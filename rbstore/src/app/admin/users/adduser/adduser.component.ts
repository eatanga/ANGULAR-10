import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { User } from 'src/app/model/user';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @Input()
  user: User

  @Output()
  userAddedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(){
  }
  addUser() {
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
