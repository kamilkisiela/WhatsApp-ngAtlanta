import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoonaModule, LOONA_CACHE, LoonaLink } from '@loona/angular';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { GraphQLRootComponent } from './graphql-root.component';
import { WhatsappModule } from '../whatsapp';
import { SharedModule } from '../shared/shared.module';
import { ChatState } from './chat.state';

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
    SharedModule,
    ApolloModule,
    HttpLinkModule,
    LoonaModule.forRoot([ChatState]),
  ],
  providers: [
    {
      provide: LOONA_CACHE,
      useValue: new InMemoryCache(),
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(cache: InMemoryCache, loona: LoonaLink, http: HttpLink) {
        return {
          cache,
          link: loona.concat(http.create({
            uri: 'http://localhost:4000/graphql'
          })),
        };
      },
      deps: [LOONA_CACHE, LoonaLink, HttpLink],
    },
  ],
})
export class GraphQLModule {}
