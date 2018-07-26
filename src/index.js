const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  // 1
  let idCount = links.length
  const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription
    }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/anson-felder/hackernews-node/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));