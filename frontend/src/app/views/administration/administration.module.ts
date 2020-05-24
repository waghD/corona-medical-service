import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: AdministrationComponent }];

@NgModule({
  declarations: [AdministrationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AdministrationModule {}
