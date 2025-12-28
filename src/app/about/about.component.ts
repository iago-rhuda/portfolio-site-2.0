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
}
