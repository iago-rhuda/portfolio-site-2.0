import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.css']
})
export class SwitchLangComponent {
  options = [
    {'value': 'pt', 'display': 'PORTUGUÊS'},
    {'value': 'en', 'display':'ENGLISH'},
    {'value': 'fr', 'display': 'FRANÇAIS'},
    {'value': 'it', 'display':'ITALIANO'}
  ];

  constructor(public translate: TranslateService) {} // Tornando o serviço público

  onChange = (lang: string) => {
    this.translate.use(lang);
  };
}