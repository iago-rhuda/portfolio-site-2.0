import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  birthdate = new Date(2003, 1, 7); // Month is 0-indexed in JS Date? Wait. new Date(2003, 1, 7) is Feb 7. 
  // The previous file had: new Date('2003-02-07T19:10:00');. Let's stick to simple Date(2003, 1, 7) or compatible.

  constructor(public translate: TranslateService) { }

  public calculateAge(): number {
    const today = new Date();
    // Use the same logic as before or the simpler one?
    // Let's use the robust one from the previous file to be safe, or just the simple one I proposed.
    // Simple one:
    const birthDate = new Date(2003, 1, 7);
    const timeDiff = Math.abs(Date.now() - birthDate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
  }

  public getFormattedDate(): string {
    const birthDate = new Date(2003, 1, 7); // Feb 7
    const currentLang = this.translate.currentLang;

    // Map of language codes to locales
    const localeMap: { [key: string]: string } = {
      'pt': 'pt-BR',
      'en': 'en-US',
      'fr': 'fr-FR',
      'it': 'it-IT',
      'de': 'de-DE',
      'ko': 'ko-KR',
      'ja': 'ja-JP',
      'zh': 'zh-CN'
    };

    const locale = localeMap[currentLang] || 'en-US';
    return birthDate.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  public hobbies = [
    {
      icon: 'bi-rocket-takeoff',
      key: 'HOBBY-1',
      topics: [
        { label: 'HOBBY-1-TOPIC-1-LABEL', value: 'HOBBY-1-TOPIC-1-VALUE' },
        { label: 'HOBBY-1-TOPIC-2-LABEL', value: 'HOBBY-1-TOPIC-2-VALUE' }
      ]
    },
    {
      icon: 'bi-cpu',
      key: 'HOBBY-2',
      topics: [
        { label: 'HOBBY-2-TOPIC-1-LABEL', value: 'HOBBY-2-TOPIC-1-VALUE' },
        { label: 'HOBBY-2-TOPIC-2-LABEL', value: 'HOBBY-2-TOPIC-2-VALUE' }
      ]
    },
    {
      icon: 'bi-grid-3x3',
      key: 'HOBBY-3',
      topics: [
        { label: 'HOBBY-3-TOPIC-1-LABEL', value: 'HOBBY-3-TOPIC-1-VALUE' },
        { label: 'HOBBY-3-TOPIC-2-LABEL', value: 'HOBBY-3-TOPIC-2-VALUE' }
      ]
    },
    {
      icon: 'bi-music-note-beamed',
      key: 'HOBBY-4',
      topics: [
        { label: 'HOBBY-4-TOPIC-1-LABEL', value: 'HOBBY-4-TOPIC-1-VALUE' },
        { label: 'HOBBY-4-TOPIC-2-LABEL', value: 'HOBBY-4-TOPIC-2-VALUE' }
      ]
    }
  ];

  // Carousel Logic
  // Carousel Logic
  carouselContainer: HTMLElement | null = null;
  autoPlayInterval: any;
  isPaused = false;

  // Triplicated list for infinite loop effect: [Set1, Set2 (Middle), Set3]
  get infiniteHobbies() {
    return [...this.hobbies, ...this.hobbies, ...this.hobbies];
  }

  ngAfterViewInit() {
    this.carouselContainer = document.querySelector('.hobbies-mobile-container');
    if (this.carouselContainer) {
      // Center initially to the middle set
      // We need to wait for render, setTimeout is a crude but effective way here
      setTimeout(() => {
        this.resetScrollPosition();
        this.startAutoPlay();
      }, 100);
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      // Check if mobile view is active (simple width check)
      if (!this.isPaused && this.carouselContainer && window.innerWidth <= 768) {
        this.scrollNext();
      }
    }, 3500);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  pauseAutoPlay() {
    this.isPaused = true;
  }

  resumeAutoPlay() {
    this.isPaused = false;
  }

  scrollNext() {
    if (!this.carouselContainer) return;

    const container = this.carouselContainer;
    const cardWidth = this.getCardWidth(container);

    // Smooth scroll to next
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }

  // Handle the infinite loop "Silent Jump"
  onScroll(event: any) {
    const container = event.target;
    // Deboucing or check thresholds
    // Total sets = 3. 
    // If we are in Set 1 (near start), jump to Set 2.
    // If we are in Set 3 (near end), jump to Set 2.

    const totalWidth = container.scrollWidth;
    const setWidth = totalWidth / 3;

    // Threshold: if we scroll closely to the start (Set 1)
    if (container.scrollLeft < 50) {
      // Jump forward to Set 2 (same relative position)
      container.scrollLeft += setWidth;
    }
    // Threshold: if we scroll past Set 2 into Set 3
    else if (container.scrollLeft > setWidth * 2) {
      // Jump back to Set 2
      container.scrollLeft -= setWidth;
    }
  }

  private getCardWidth(container: HTMLElement): number {
    const card = container.querySelector('.hobby-card');
    // card width + gap. Gap is 1rem (16px) computed style
    return (card?.clientWidth || 0) + 16;
  }

  private resetScrollPosition() {
    if (this.carouselContainer) {
      const totalWidth = this.carouselContainer.scrollWidth;
      // Start at the beginning of the MIDDLE set (Set 2)
      this.carouselContainer.scrollLeft = totalWidth / 3;
    }
  }
}
