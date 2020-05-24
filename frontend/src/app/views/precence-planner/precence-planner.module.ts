import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecencePlannerComponent } from './precence-planner.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: PrecencePlannerComponent }];

@NgModule({
  declarations: [PrecencePlannerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PrecencePlannerModule {}
