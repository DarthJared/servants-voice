import {Component, EventEmitter, Output} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  faBars = faBars;
  @Output() displaySidePanel = new EventEmitter<string>();

  showSidePanel() {
    this.displaySidePanel.emit('show');
  }
}
