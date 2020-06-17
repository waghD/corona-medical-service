import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, PipesModule, FlexLayoutModule],
  exports: [ComponentsModule, PipesModule, FlexLayoutModule],
})
export class SharedModule {}
