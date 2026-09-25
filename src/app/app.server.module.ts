import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

export class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    try {
      const filePath = path.join(process.cwd(), 'src', 'assets', 'languages', `${lang}.json`);
      const content = fs.readFileSync(filePath, 'utf8');
      return of(JSON.parse(content));
    } catch (e) {
      return of({});
    }
  }
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: ServerTranslateLoader
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
