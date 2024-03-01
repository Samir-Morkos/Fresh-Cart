import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarAuthComponent } from 'src/app/components/navbar-auth/navbar-auth.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule,NavbarAuthComponent,RouterOutlet,FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

}
