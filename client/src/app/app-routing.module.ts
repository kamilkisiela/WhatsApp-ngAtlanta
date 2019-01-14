import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectComponent } from './select.component';

const routes: Routes = [
  {
    path: '',
    component: SelectComponent,
    pathMatch: 'full',
  },
  {
    path: 'fake',
    loadChildren: './fake/fake.module#FakeModule',
  },
  {
    path: 'ngrx',
    loadChildren: './ngrx/ngrx.module#NgRxModule',
  },
  {
    path: 'graphql',
    loadChildren: './graphql/graphql.module#GraphQLModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
