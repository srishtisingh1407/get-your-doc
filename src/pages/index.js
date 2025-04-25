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
      .then((data) => setDoctors(data));
  }, []);

  const filteredDoctors = filterDoctors(doctors, router.query);

  return (
    <div className="min-h-screen p-4 bg-blue-100">
      <h1 className="uppercase text-3xl font-bold text-cyan-950 text-center mb-5">Find your doctor</h1>
      
      <div className="mb-6 flex justify-center">
        <div className="w-full md:w-1/2">
          <AutocompleteSearch doctors={doctors} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-cyan-950 uppercase">Filters</h2>
            <FiltersPanel />
          </div>
        </div>

       
        <div className="md:col-span-3">
          {filteredDoctors.length === 0 ? (
            <p className="text-gray-500 text-center mt-12">No doctors found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
