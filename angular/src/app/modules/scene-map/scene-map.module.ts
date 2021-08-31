import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneMapComponent } from './components/scenemap.component';

@NgModule({
  declarations: [
    SceneMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SceneMapComponent
  ]
})
export class SceneMapModule {

}
