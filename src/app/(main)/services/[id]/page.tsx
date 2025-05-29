'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Service {
  _id: string;
  name: string;
  description: string;
  // Add other service properties as needed
}

const ServiceDetailPage = () => {
  const params = useParams();
  const serviceId = params.id;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        try {
          const response = await fetch(`/services/${serviceId}`); // Assuming your backend is on the same origin
          if (!response.ok) {
            throw new Error(`Error fetching service: ${response.statusText}`);
          }
          const data: Service = await response.json();
          setService(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchService();
    } else {
      setLoading(false);
      setError("Service ID not provided.");
    }
  }, [serviceId]);

  if (loading) {
    return <p>Loading service details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!service) {
    return <p>Service not found.</p>;
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      {/* Display other service details here */}
    </div>
  );
};

export default ServiceDetailPage;