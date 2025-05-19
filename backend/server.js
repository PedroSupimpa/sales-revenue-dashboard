const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");
require("dotenv").config();

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongo connected");

  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(
      `Server is running at http://localhost:${port}${server.graphqlPath}`
    )
  );
}

startServer();
