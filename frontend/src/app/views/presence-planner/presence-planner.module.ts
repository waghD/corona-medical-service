import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencePlannerComponent } from './presence-planner.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PresencePlannerService } from './presence-planner.service';

const routes: Routes = [{ path: '', component: PresencePlannerComponent }];

@NgModule({
  declarations: [PresencePlannerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [PresencePlannerService],
})
export class PresencePlannerModule {}
