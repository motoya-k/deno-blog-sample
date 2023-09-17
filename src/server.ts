import { load } from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import { serve } from "http/server";

await load({ export: true });

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello Deno!",
      },
    },
  }),
});

serve(yoga, {
  onListen({ hostname, port }) {
    console.log(
      `Listening on http://${hostname}:${port}/${yoga.graphqlEndpoint}`
    );
  },
});
