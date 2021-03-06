import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanersComponent } from './cleaners.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CleanersService } from './cleaners.service';

const routes: Routes = [{ path: '', component: CleanersComponent }];

@NgModule({
  declarations: [CleanersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [CleanersService],
})
export class CleanersModule {}
