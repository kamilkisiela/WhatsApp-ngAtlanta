import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoonaModule, LOONA_CACHE, LoonaLink } from '@loona/angular';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

import { GraphQLRootComponent } from './graphql-root.component';
import { WhatsappModule } from '../whatsapp';

const routes: Routes = [
  {
    path: '',
    component: GraphQLRootComponent,
  },
];

@NgModule({
  declarations: [GraphQLRootComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WhatsappModule,
    ApolloModule,
    LoonaModule.forRoot(),
  ],
  providers: [
    {
      provide: LOONA_CACHE,
      useValue: new InMemoryCache(),
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(cache: InMemoryCache, loona: LoonaLink) {
        const rest = new RestLink({ uri: 'http://localhost:4000' });
        return {
          cache,
          link: loona.concat(rest),
        };
      },
      deps: [LOONA_CACHE, LoonaLink],
    },
  ],
})
export class GraphQLModule {}
