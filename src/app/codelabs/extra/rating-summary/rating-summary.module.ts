import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpModule } from '@angular/http';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { RatingSummaryComponent } from './rating-summary.component';


const routes = RouterModule.forChild(
  SlidesRoutes.get(RatingSummaryComponent)
);

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [routes, BrowserWindowModule, PresentationModule, angularFire, CommonModule, HttpModule, FeedbackModule],
  declarations: [RatingSummaryComponent],
  providers: [AngularFireDatabaseProvider, AngularFireAuthProvider],
  exports: [RatingSummaryComponent]
})
export class RatingSummaryModule {

}
