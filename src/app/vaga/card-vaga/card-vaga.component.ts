import { Component } from '@angular/core';
import { Vaga } from '../../models/vaga';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.css'
})
export class CardVagaComponent {
  @Input() vaga!: Vaga;
}
