const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Location {
    id: ID!
    name: String!
    image: String!
    hostels: [Hostel]
    hostelCount: Int
  }

  type Hostel {
    id: ID!
    name: String!
    image: String!
    locationId: ID!
  }

  type Query {
    locations: [Location]
    location(id: ID!): Location
    hostelsByLocation(locationId: ID!): [Hostel]
  }

  type Mutation {
    addLocation(name: String!, image: String!): Location
    addHostel(name: String!, image: String!, locationId: ID!): Hostel
  }
`;

module.exports = typeDefs;
