import { useEffect, useState } from "react";
import AutocompleteSearch from "../../components/AutocompleteSearch";
import FiltersPanel from "../../components/FiltersPanel";
import DoctorCard from "../../components/DoctorCard";
import { filterDoctors } from "../../utils/filterUtils";
import { useRouter } from "next/router";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  const filteredDoctors = filterDoctors(doctors, router.query);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Find Your Doctor</h1>

      {/* Search bar */}
      <div className="mb-6 max-w-3xl mx-auto">
        <AutocompleteSearch doctors={doctors} />
      </div>

      {/* Filters */}
      <div className="mb-10 max-w-5xl mx-auto">
        <FiltersPanel />
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredDoctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
}
