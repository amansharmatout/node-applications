import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Todos List';
  text: string = 'Click Me!';
  isHidden: boolean = true;
  changeText(): string {
    return (this.text = 'Thank you');
  }
}
