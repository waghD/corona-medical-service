import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from './doctors.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsService } from './doctors.service';

const routes: Routes = [{ path: '', component: DoctorsComponent }];

@NgModule({
  declarations: [DoctorsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [DoctorsService],
})
export class DoctorsModule {}
