import { Routes } from '@angular/router';
import { ListagemVagasComponent } from './vaga/listagem-vagas/listagem-vagas.component';
import { HomeComponent } from './pages/home/home.component';
import { CandidatoDashboardComponent} from './candidato/dashboard-candidato/dashboard-candidato.component';
import { ListagemCandidatoComponent } from './candidato/listagem-candidato/listagem-candidato.component';
import { CadastrarVagaComponent } from './vaga/cadastrar-vaga/cadastrar-vaga.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CadastroPageComponent } from './pages/cadastro-page/cadastro-page.component';
import { RecrutadorDashboardComponent } from './recrutador/recrutador-dashboard/recrutador-dashboard.component';
import { ListarCandidaturasComponent } from './vaga/listar-candidaturas/listar-candidaturas.component';

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
        path: "cadastro",
        component: CadastroPageComponent,
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
    },
    {
        path: "recrutador-dashboard",
        component: RecrutadorDashboardComponent
    },
    {
        path: "listar-candidaturas",
        component: ListarCandidaturasComponent
    }
];
