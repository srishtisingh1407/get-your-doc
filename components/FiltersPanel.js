import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { specialtiesList } from "../utils/filterUtils";

export default function FiltersPanel() {
  const router = useRouter();
  const query = router.query;

  const [specialtySearch, setSpecialtySearch] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState(specialtiesList);

  useEffect(() => {
    const filtered = specialtiesList.filter((spec) =>
      spec.toLowerCase().includes(specialtySearch.toLowerCase())
    );
    setFilteredSpecialties(filtered);
  }, [specialtySearch]);

  const handleModeChange = (e) => {
    router.push({
      pathname: "/",
      query: { ...query, mode: e.target.value },
    });
  };

  const handleSpecialtyChange = (e) => {
    const selected = query.specialties ? query.specialties.split(",") : [];
    const value = e.target.value;
    let updated;
    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }
    router.push({
      pathname: "/",
      query: { ...query, specialties: updated.join(",") },
    });
  };

  const handleSortChange = (e) => {
    router.push({
      pathname: "/",
      query: { ...query, sort: e.target.value },
    });
  };

  return (
    <div className="p-4 bg-blue-50 shadow rounded">
      <h3 data-testid="filter-header-moc" className="font-bold mb-2">Mode of Consultation</h3>
      <div className="mb-4">
        <label>
          <input
            data-testid="filter-video-consult"
            type="radio"
            value="video"
            checked={query.mode === "video"}
            onChange={handleModeChange}
          />
          Video Consultation
        </label>
        <br />
        <label>
          <input
            data-testid="filter-in-clinic"
            type="radio"
            value="clinic"
            checked={query.mode === "clinic"}
            onChange={handleModeChange}
          />
          In-clinic Consultation
        </label>
      </div>

      <h3 data-testid="filter-header-speciality" className="font-bold mb-2">Specialities</h3>
      <input
        type="text"
        placeholder="Search specialties..."
        value={specialtySearch}
        onChange={(e) => setSpecialtySearch(e.target.value)}
        className="mb-2 p-2 w-full border rounded"
      />
      <div className="max-h-60 overflow-y-auto pr-1">
        {filteredSpecialties.map((spec) => (
          <div key={spec}>
            <label>
              <input
                type="checkbox"
                value={spec}
                data-testid={`filter-specialty-${spec.replace(/\//g, "-")}`}
                checked={query.specialties?.split(",").includes(spec)}
                onChange={handleSpecialtyChange}
              />
              {spec}
            </label>
          </div>
        ))}
      </div>

      <h3 data-testid="filter-header-sort" className="font-bold mt-4 mb-2">Sort</h3>
      <div>
        <label>
          <input
            data-testid="sort-fees"
            type="radio"
            value="fees"
            checked={query.sort === "fees"}
            onChange={handleSortChange}
          />
          Price Low-High
        </label>
        <br />
        <label>
          <input
            data-testid="sort-experience"
            type="radio"
            value="experience"
            checked={query.sort === "experience"}
            onChange={handleSortChange}
          />
          Experience High-Low
        </label>
      </div>
    </div>
  );
}
