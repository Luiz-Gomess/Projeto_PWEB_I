import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga';
import { CardVagaComponent } from '../../vaga/card-vaga/card-vaga.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from '../../layout/footer/footer.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, CardVagaComponent, SlickCarouselModule, NavbarComponent, FooterComponent],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  vagas: Vaga[] = [];

  constructor(private vagaService: VagaService, private router: Router) {}

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  navigateToNewVaga () {
    this.router.navigate(['/cadastrar-vaga'])
  }

  navigateToListagemVagas () {
    this.router.navigate(['/listagem-vagas'])
  }

  ngOnInit() {
    this.vagaService.listarVagas().subscribe((dados) => {
      this.vagas = dados;
    });
  }
}
