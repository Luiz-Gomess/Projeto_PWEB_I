import { Routes } from '@angular/router';
import { ListagemVagasComponent } from './vaga/listagem-vagas/listagem-vagas.component';
import { CadastroCandidatoComponent } from './candidato/cadastro-candidato/cadastro-candidato.component';

export const routes: Routes = [
    {
        path: "listagem-vagas",
        component: ListagemVagasComponent,
    },
    {
        path: "cadastro-candidato",
        component: CadastroCandidatoComponent,
    }
];
