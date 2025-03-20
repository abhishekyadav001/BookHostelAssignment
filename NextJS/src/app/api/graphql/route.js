import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoose from "mongoose";
import Location from "@/models/Location";
import Hostel from "@/models/Hostel";

const typeDefs = `
  type Location {
    id: ID!
    name: String!
    image: String!
  }
  type Hostel {
    id: ID!
    name: String!
    image: String!
    locationId: ID!
  }
  type Query {
    locations: [Location!]!
    hostelsByLocation(locationId: ID!): [Hostel!]!
    hostelCountByLocation: [LocationCount!]!
  }
  type LocationCount {
    locationId: ID!
    name: String!
    count: Int!
  }
`;

const resolvers = {
  Query: {
    locations: async () => await Location.find(),
    hostelsByLocation: async (_, { locationId }) => {
      console.log("Querying hostels for locationId:", locationId);
      const result = await Hostel.find({ locationId }); // Query as string
      console.log("Found hostels:", result);
      return result;
    },
    hostelCountByLocation: async () => {
      return await Hostel.aggregate([
        { $group: { _id: "$locationId", count: { $sum: 1 } } },
        { $lookup: { from: "locations", localField: "_id", foreignField: "_id", as: "location" } },
        { $unwind: "$location" },
        { $project: { locationId: "$_id", name: "$location.name", count: 1 } },
      ]);
    },
  },
};

const connectToMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = async (req, ctx) => {
  await connectToMongoDB();
  return startServerAndCreateNextHandler(apolloServer)(req, ctx);
};

export { handler as GET, handler as POST };
