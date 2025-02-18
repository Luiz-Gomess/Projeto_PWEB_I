import { Component } from '@angular/core';
import { Vaga } from '../../models/vaga';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoStateService } from '../../services/candidato-state.service';
import { Candidato } from '../../models/candidato';
import { CandidatoService } from '../../services/candidato.service';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.css'
})
export class CardVagaComponent {
  @Input() vaga!: Vaga;
  candidato?: Candidato;

  constructor(private candidatoStateService: CandidatoStateService, private candidatoService: CandidatoService){}

  ngOnInit() {
    this.candidato = this.candidatoStateService.getCandidato() as Candidato;
  }

  candidatar() {
    console.log(this.candidato)
    if(this.candidato?.cpf) {

      this.candidatoService.candidatar(this.vaga.id, this.candidato?.cpf)
      console.log('aobaa')
    }
  }
}
