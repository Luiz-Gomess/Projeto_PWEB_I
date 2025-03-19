import { Component, Input } from '@angular/core';
import { Candidato } from '../../shared/models/candidato';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidato-card-profile',
  imports: [CommonModule],
  templateUrl: './candidato-card-profile.component.html',
  styleUrl: './candidato-card-profile.component.css'
})
export class CandidatoCardProfileComponent {
  @Input() candidato!: Candidato;

  hab: string[] = ["java", "spring", "html", "sql", "AWS", "Docker", "Css", "Comunicação", "Trabalho em equipe"]
}