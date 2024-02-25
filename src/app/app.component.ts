import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'portfolio-site';
  birthdate = new Date('2003-02-07T19:10:00');
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
    // Lógica para determinar a seção ativa durante o rolar da página
    this.detectarSecaoAtiva();
    this.animeScroll();
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


  // calculating my age
  calculateAge(): number {
    const today = new Date();
    const birthdateThisYear = new Date(today.getFullYear(), this.birthdate.getMonth(), this.birthdate.getDate(), this.birthdate.getHours(), this.birthdate.getMinutes(), this.birthdate.getSeconds());

    let age = today.getFullYear() - this.birthdate.getFullYear();

    if (today.getTime() < birthdateThisYear.getTime()) {
      age--;
    }

    return age;
  }
}
