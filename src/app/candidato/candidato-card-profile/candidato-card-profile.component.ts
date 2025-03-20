import { Component, Input } from '@angular/core';
import { Candidato } from '../../shared/models/candidato';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidato-card-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './candidato-card-profile.component.html',
  styleUrl: './candidato-card-profile.component.css'
})
export class CandidatoCardProfileComponent {
  @Input() candidato!: Candidato;
}