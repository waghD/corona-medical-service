import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';

@NgModule({
  declarations: [HeaderComponent, TestcomponentComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule],
  exports: [HeaderComponent, MaterialModule],
})
export class ComponentsModule {}
