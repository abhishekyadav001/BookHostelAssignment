"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cartSlice";

const GET_HOSTELS = gql`
  query HostelsByLocation($locationId: ID!) {
    hostelsByLocation(locationId: $locationId) {
      id
      name
      image
    }
  }
`;

export default function Hostels() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.hostels);

  console.log("locationId from useParams:", id); // Debug the ID
// debug this line of query 
const { loading, error, data } = useQuery(GET_HOSTELS, { variables: { locationId: id } });
  console.log("useQuery result:", { loading, error, data }); // Debug the query result

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.hostelsByLocation) return <p>No hostels found for this location</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Hostels</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.hostelsByLocation.map((hostel) => (
          <div key={hostel.id} className="border p-4">
            <img src={hostel.image} alt={hostel.name} className="w-full h-48 object-cover" />
            <p className="text-lg mt-2">{hostel.name}</p>
            {cart.includes(hostel.id) ? (
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2"
                onClick={() => dispatch(removeFromCart(hostel.id))}
              >
                Remove from Cart
              </button>
            ) : (
              <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={() => dispatch(addToCart(hostel.id))}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
