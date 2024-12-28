import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
// Merge additional providers into appConfig
const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [], // Preserve existing providers from appConfig
    provideHttpClient(
      withInterceptors([authInterceptor]) 
    ), // Required for remote Markdown loading
    importProvidersFrom(MarkdownModule.forRoot()), // Initialize MarkdownModule
  ],
};
bootstrapApplication(AppComponent, extendedAppConfig)
  .catch((err) => console.error(err));
