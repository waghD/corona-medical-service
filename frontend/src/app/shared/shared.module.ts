import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, PipesModule, MaterialModule],
  exports: [ComponentsModule, PipesModule, MaterialModule],
})
export class SharedModule {}
