import { load } from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import { serve } from "http/server";
import { resolvers } from "./resolvers/index.ts";

await load({ export: true });

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Post {
        id: ID!
        platform: String!
        title: String!
        publishedAt: String!
        createdAt: String!
        updatedAt: String!
      }
      type Query {
        ping: String!
        posts: [Post!]!
      }
    `,
    resolvers,
  }),
});

serve(yoga, {
  onListen({ hostname, port }) {
    console.log(
      `Listening on http://${hostname}:${port}/${yoga.graphqlEndpoint}`
    );
  },
});
