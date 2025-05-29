import React from 'react';

interface Service {
  _id: string;
  name: string;
  description: string;
  // Add other service properties here
}

async function getServices(): Promise<Service[]> {
  const res = await fetch('/services'); // Assuming your API is hosted on the same domain
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            {/* Display other service properties */}
          </li>
        ))}
      </ul>
    </div>
  );
}