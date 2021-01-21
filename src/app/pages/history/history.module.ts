import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@/app/share/share.module';
import { HistoryComponent } from './history.component';
import { PhotoItemComponent } from './photo-item/photo-item.component';

const routes: Routes = [{ path: '', component: HistoryComponent }]

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HistoryComponent,
    PhotoItemComponent]
})
export class HistoryModule { }
