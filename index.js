import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./type-defs";

const server = new ApolloServer({
	typeDefs
	// resolvers
});

const PORT = 4000;
const { url } = await startStandaloneServer(server, { listen: { port: PORT } });

console.log(`Server ready at port ${PORT}`);
