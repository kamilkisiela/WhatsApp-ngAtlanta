# WhatsApp clone for ngAtlanta

Comparing [**Loona**](https://loonajs.com) and [**NGRX**](https://ngrx.io) by building the same app with both of them.

## Blogpost

Here's the [_"Compare Loona and NGRX"_]() blogpost.

## Features

- [Use REST API to load chats](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/chats) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/894bcba...chats))
- [Load messages](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/messages) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/chats...messages))
- [Implement Caching](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/caching) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/messages...caching))
- [Send a new message](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/send-message) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/caching...send-message))
- [Implement Optimistic UI so the app feels instant](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/optimistic) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/send-message...optimistic))
- [Combine remote data with local-only state](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/local) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/optimistic...local))
- [Use GraphQL instead of REST](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/tree/graphql) ([see diff](https://github.com/kamilkisiela/WhatsApp-ngAtlanta/compare/local...graphql))

## How to run

WhatsApp has an API and the client app.

### API

```bash
# Go to the API
cd api

# Install packages
yarn

# Run it
yarn start
```

### Client

```bash
# Go to the client
cd client

# Install packages
yarn

# Run it
yarn start
```
