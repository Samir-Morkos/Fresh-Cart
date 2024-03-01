import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule,NavbarBlankComponent,RouterOutlet,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

  goToUp():void{
    scrollTo(0,0)
  }

}
