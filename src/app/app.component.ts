import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-site';
  secaoAtiva: string = 'HOME';

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['en', 'pt', 'fr', 'it']);
    const lang = this.translate.getBrowserLang();
    if (lang != 'en' && lang != 'pt' && lang != 'it' && lang != 'fr') {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.use(lang);
    }
  }

  // =============================================================================
  ngAfterViewInit() {
    this.animeScroll();
    window.addEventListener('scroll', () => {
      this.animeScroll();
    });
  }

  private animeScroll() {
    const items = document.querySelectorAll("[data-anime]");
    const windowTop = window.pageYOffset + window.innerHeight * 0.85;

    items.forEach((element: any) => {
      const elementTop = element.getBoundingClientRect().top;

      if (windowTop > elementTop) {
        element.classList.add('animate');
      } else {
        element.classList.remove('animate');
      }
    });
  }
  // =============================================================================

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.detectarSecaoAtiva();
    this.animeScroll();
  }
  setSecaoAtiva(secao: string) {
    this.secaoAtiva = secao;
  }

  private detectarSecaoAtiva() {
    const secoes = ['HOME', 'ABOUT', 'QUALIFICATIONS', 'SKILLS', 'PORTFOLIO', 'ARTICLES', 'CURRICULUM', 'CONTACT'];

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
