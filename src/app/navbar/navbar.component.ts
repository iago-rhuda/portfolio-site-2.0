import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  secaoAtiva: string = 'HOME';

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Lógica para determinar a seção ativa durante o rolar da página
    this.detectarSecaoAtiva();
  }

  setSecaoAtiva(secao: string) {
    this.secaoAtiva = secao;
  }

  private detectarSecaoAtiva() {
    const secoes = ['HOME', 'ABOUT', 'QUALIFICATIONS', 'SKILLS', 'PORTFOLIO', 'CURRICULUM', 'CONTACT'];

    for (const secao of secoes) {
      const elemento = document.getElementById(secao);

      if (elemento) {
        const retangulo = elemento.getBoundingClientRect();

        if (retangulo.top <= 50 && retangulo.bottom >= 50) {
          this.setSecaoAtiva(secao);
          break;
        }
      }
    }
  }
}
