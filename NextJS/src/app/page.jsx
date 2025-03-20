"use client"; // Add this since useQuery requires a Client Component

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      image
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available</p>; // Extra safety check

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Locations</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.locations.map((location) => (
          <Link href={`/hostels/${location.id}`} key={location.id}>
            <div className="border p-4">
              <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
              <p className="text-lg mt-2">{location.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
