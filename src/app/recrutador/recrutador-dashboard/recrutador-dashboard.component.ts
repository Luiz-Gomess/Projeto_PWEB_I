import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardVagaComponent } from '../../vaga/card-vaga/card-vaga.component';
import { Router } from '@angular/router';
import { Vaga } from '../../shared/models/vaga';
import { VagaService } from '../../shared/services/vaga.service';
import { RecrutadorService } from '../../shared/services/recrutador.service';
import { UserStateService } from '../../shared/services/user-state.service';
import { Recrutador } from '../../shared/models/recrutador';

@Component({
  selector: 'app-recrutador-dashboard',
  imports: [NavbarComponent, FooterComponent, MatIcon, CommonModule, CardVagaComponent],
  templateUrl: './recrutador-dashboard.component.html',
  styleUrl: './recrutador-dashboard.component.css'
})
export class RecrutadorDashboardComponent {
  listagemVagas: Vaga[] = []
  recrutador: Recrutador | undefined;

  constructor(private router: Router, private userStateService: UserStateService, private vagaService: VagaService, private recrutadorService: RecrutadorService) {}

  navigateToNewVaga() {
    this.router.navigate(['/cadastrar-vaga']);
  }

  ngOnInit() {
    this.recrutador = this.userStateService.getRecruiter() as Recrutador;
    if (!this.recrutador) {
      this.router.navigate(['/login']);
    }

    this.recrutadorService.listarVagasRecrutador(this.recrutador.cpf).subscribe((vagas) => {
      this.listagemVagas = vagas;
    });
  }
}
