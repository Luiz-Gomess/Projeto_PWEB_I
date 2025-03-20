import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato } from '../../shared/models/candidato';
import { Vaga } from '../../shared/models/vaga';
import { VagaService } from '../../shared/services/vaga.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-listar-candidaturas',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './listar-candidaturas.component.html',
  styleUrl: './listar-candidaturas.component.css'
})
export class ListarCandidaturasComponent {
  vagaId: string | null = null;
  listagemCandidaturas: Candidato[] = [];

  constructor(private router: Router,
    private vagaService: VagaService,
  ) {}

  ngOnInit() {
    this.vagaId = window.localStorage.getItem('vagaId');
    this.vagaService.listarCandidaturas(this.vagaId as string).subscribe(candidaturas => {
      this.listagemCandidaturas = candidaturas;
    });
  }
}
