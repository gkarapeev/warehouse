import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./type-defs.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
	typeDefs,
	resolvers
});

const PORT = 4000;
await startStandaloneServer(server, { listen: { port: PORT } });

console.log(`Server ready at port ${PORT}`);
