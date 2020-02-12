import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, LoginState } from '../auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  environment = environment;

  loginState: Observable<LoginState>;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.loginState = this.auth.state();
  }

}
