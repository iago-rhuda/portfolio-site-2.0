import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.css']
})
export class SwitchLangComponent implements OnInit {

  options = [
    { value: 'en', display: 'English', flag: '🇺🇸' },
    { value: 'pt', display: 'Português', flag: '🇧🇷' },
    { value: 'fr', display: 'Français', flag: '🇫🇷' },
    { value: 'es', display: 'Español', flag: '🇪🇸' },
    { value: 'it', display: 'Italiano', flag: '🇮🇹' },
    { value: 'de', display: 'Deutsch', flag: '🇩🇪' },
    { value: 'ko', display: '한국어', flag: '🇰🇷' },
    { value: 'ja', display: '日本語', flag: '🇯🇵' },
    { value: 'zh', display: '中文', flag: '🇨🇳' }
  ];

  isDarkMode = true;
  showName = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showName = window.scrollY > 100; // Show name after scrolling 100px
  }

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    // Ensure dark mode is default
    this.updateTheme();

    // Browser Language Detection
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const langCode = browserLang ? browserLang.split('-')[0] : 'en'; // Extract 'en' from 'en-US'

    // Check if the extracted language is supported, otherwise fallback to 'en'
    const supportedLang = this.options.find(o => o.value === langCode) ? langCode : 'en';

    // Set the language
    this.translate.use(supportedLang);
  }

  onChange(lang: string) {
    this.translate.use(lang);
  }

  getFlag() {
    const lang = this.translate.currentLang;
    const option = this.options.find(o => o.value === lang);
    return option ? option.flag : '🇺🇸'; // Default to US flag if undefined
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }
}