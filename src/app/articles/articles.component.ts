import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

  private readonly SOURCE = [
    {
      title: 'ARTICLE_COBEM_TITLE',
      link: '',
      description: 'ARTICLE_COBEM_DESC',
      longDescription: 'ARTICLE_COBEM_LONG_DESC',
      lang: 'en',
      pending: true,
      hideButton: false
    },
    {
      title: 'ARTICLE_PIBIC_TITLE',
      link: '',
      description: 'ARTICLE_PIBIC_DESC',
      longDescription: 'ARTICLE_PIBIC_LONG_DESC',
      lang: 'pt',
      pending: false,
      hideButton: true
    }
  ];

  articles = [
    ...this.SOURCE
  ];

  modalVisible = false;
  selectedArticle: any = null;

  private isDragging = false;
  private dragStartX = 0;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  private get track(): HTMLDivElement {
    return this.trackRef.nativeElement;
  }

  onPointerDown(event: PointerEvent): void {
    this.dragStartX = event.clientX;
    this.isDragging = false;
  }

  onPointerMove(event: PointerEvent): void {
    if (Math.abs(event.clientX - this.dragStartX) > 6) {
      this.isDragging = true;
    }
  }

  onCardClick(article: any, event: Event): void {
    if (!this.isDragging) {
      this.openArticle(article, event);
    }
    this.isDragging = false;
  }

  openArticle(article: any, event: Event): void {
    event.stopPropagation();
    this.selectedArticle = article;
    this.modalVisible = true;
    this.pauseAutoPlay();
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalVisible = false;
    setTimeout(() => {
      this.selectedArticle = null;
      document.body.style.overflow = '';
    }, 300);
    this.resumeAutoPlay();
  }

  @HostListener('document:keydown.escape')
  onEscKey(): void {
    if (this.modalVisible) this.closeModal();
  }

  onScroll(): void {}

  private getCardScrollAmount(): number {
    const el = this.track;
    if (!el) return 360;
    const card = el.querySelector('.project-card') as HTMLElement;
    if (!card) return 360;
    const gap = parseFloat(getComputedStyle(el).columnGap || '28');
    return card.offsetWidth + gap;
  }

  scrollLeft(): void {
    if (this.track) {
      this.track.scrollBy({ left: -this.getCardScrollAmount(), behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.track) {
      this.track.scrollBy({ left: this.getCardScrollAmount(), behavior: 'smooth' });
    }
  }

  pauseAutoPlay(): void {}
  resumeAutoPlay(): void {}

  @HostListener('window:resize')
  onResize(): void {}
}
