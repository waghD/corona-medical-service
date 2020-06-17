import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersComponent } from './helpers.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpersService } from './helpers.service';

const routes: Routes = [{ path: '', component: HelpersComponent }];

@NgModule({
  declarations: [HelpersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [HelpersService],
})
export class HelpersModule {}
