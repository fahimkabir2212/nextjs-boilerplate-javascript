"use server";
import { getPrivate } from "@/utils/api/get";

export default async function TestPrivateFetch() {
  const doctors = await getPrivate("/patient/emergency-request");
  return (
    <div className="products-container">
      <h1 className="font-bold border p-2">
        Emergency call List - Private API
      </h1>
      <div className="product-grid">
        {doctors?.data?.data.map((patient) => (
          <div key={patient.id}>
            <h2>{patient.uuid}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
