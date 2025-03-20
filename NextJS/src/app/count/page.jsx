import { useQuery, gql } from "@apollo/client";

const GET_HOSTEL_COUNT = gql`
  query HostelCountByLocation {
    hostelCountByLocation {
      locationId
      name
      count
    }
  }
`;

export default function HostelCount() {
  const { loading, data } = useQuery(GET_HOSTEL_COUNT);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Hostel Count by Location</h1>
      <ul>
        {data.hostelCountByLocation.map((item) => (
          <li key={item.locationId} className="mb-2">
            {item.name}: {item.count} hostels
          </li>
        ))}
      </ul>
    </div>
  );
}
