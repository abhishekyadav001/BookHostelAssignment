const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs.js");
const resolvers = require("./resolvers/index.js");
const locationRoutes = require("./routes/locationRoutes.js");
const hostelRoutes = require("./routes/hostelRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// REST API Routes
app.use("/api/locations", locationRoutes);
app.use("/api/hostels", hostelRoutes);

const server = new ApolloServer({ typeDefs, resolvers });

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
};

startApolloServer();

module.exports = app;
