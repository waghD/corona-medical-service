import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersComponent } from './helpers.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: HelpersComponent }];

@NgModule({
  declarations: [HelpersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class HelpersModule {}
