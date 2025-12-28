import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  articles = [
    {
      title: 'ARTICLE_COBEM_TITLE',
      link: '',
      description: 'ARTICLE_COBEM_DESC',
      lang: 'en',
      pending: true
    }
  ];

}
