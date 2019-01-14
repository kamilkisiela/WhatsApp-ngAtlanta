import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectToolButtonComponent } from './select-tool-button.component';

@NgModule({
  declarations: [SelectToolButtonComponent],
  exports: [SelectToolButtonComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
