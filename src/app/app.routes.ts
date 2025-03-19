import { Routes } from '@angular/router';
import { ListagemVagasComponent } from './vaga/listagem-vagas/listagem-vagas.component';
import { CadastroCandidatoComponent } from './candidato/cadastro-candidato/cadastro-candidato.component';
import { HomeComponent } from './pages/home/home.component';
import { CandidatoDashboardComponent} from './candidato/dashboard-candidato/dashboard-candidato.component';
import { ListagemCandidatoComponent } from './candidato/listagem-candidato/listagem-candidato.component';
import { CadastrarVagaComponent } from './vaga/cadastrar-vaga/cadastrar-vaga.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent 
    },
    { 
        path: 'home', 
        component: HomeComponent 
    },
    {
        path: "listagem-vagas",
        component: ListagemVagasComponent,
    },
    {
        path: "cadastro-candidato",
        component: CadastroCandidatoComponent,
    },
    {
        path: "candidato-dashboard",
        component: CandidatoDashboardComponent,
    },
    {
        path: "listagem-candidatos",
        component: ListagemCandidatoComponent,
    }, 
    {
        path: "cadastrar-vaga",
        component: CadastrarVagaComponent
    },
    {
        path: "login",
        component: LoginPageComponent
    }
];
