import { useRouter } from "next/router";
import { specialtiesList } from "../utils/filterUtils";

export default function FiltersPanel() {
  const router = useRouter();
  const query = router.query;

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Mode Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4 text-blue-700">Mode of Consultation</h3>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            <input
              type="radio"
              value="video"
              checked={query.mode === "video"}
              onChange={handleModeChange}
              className="mr-2"
            />
            Video Consultation
          </label>
          <label className="text-sm">
            <input
              type="radio"
              value="clinic"
              checked={query.mode === "clinic"}
              onChange={handleModeChange}
              className="mr-2"
            />
            In-clinic Consultation
          </label>
        </div>
      </div>

      {/* Specialities Card */}
      <div className="bg-white p-6 rounded-lg shadow-md max-h-[300px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4 text-green-700">Specialities</h3>
        <div className="flex flex-col gap-2">
          {specialtiesList.map((spec) => (
            <label key={spec} className="text-sm">
              <input
                type="checkbox"
                value={spec}
                checked={query.specialties?.split(",").includes(spec)}
                onChange={handleSpecialtyChange}
                className="mr-2"
              />
              {spec}
            </label>
          ))}
        </div>
      </div>

      {/* Sort Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4 text-purple-700">Sort</h3>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            <input
              type="radio"
              value="fees"
              checked={query.sort === "fees"}
              onChange={handleSortChange}
              className="mr-2"
            />
            Price: Low to High
          </label>
          <label className="text-sm">
            <input
              type="radio"
              value="experience"
              checked={query.sort === "experience"}
              onChange={handleSortChange}
              className="mr-2"
            />
            Experience: High to Low
          </label>
        </div>
      </div>
    </div>
  );
}
