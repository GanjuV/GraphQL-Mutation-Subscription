import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Mutation from './resolvers/mutation'
import Query from './resolvers/query'
import Subscription from './resolvers/subscription'

const pubsub = new PubSub()
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: {
    // User for auth token or database
    db,
    pubsub
  }
})

server.start({ 
  port: 3001
},() => {
  console.log('The server is up on port 3001!')
},)