import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @ViewChild('emailInput') emailInput!: ElementRef;
  isValid: boolean = true;

  isValidEmail(): void {
    const email = this.emailInput.nativeElement.value;
    this.isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
