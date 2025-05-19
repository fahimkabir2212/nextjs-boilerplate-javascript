"use server";
import { getPublic } from "@/utils/api/get";

export default async function TestServerFetch() {
  const doctors = await getPublic("/doctor");
  return (
    <div className="products-container">
      <h1 className="font-bold border p-2">Doctors - Public API</h1>
      <div className="product-grid">
        {doctors?.doctors.map((doctor) => (
          <div key={doctor.id}>
            <h2>{doctor.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
