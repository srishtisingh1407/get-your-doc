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
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-6">
        {/* Mode of consultation */}
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">Mode</h3>
          <label className="text-sm">
            <input
              type="radio"
              value="video"
              checked={query.mode === "video"}
              onChange={handleModeChange}
              className="mr-1"
            />
            Video
          </label>
          <label className="text-sm">
            <input
              type="radio"
              value="clinic"
              checked={query.mode === "clinic"}
              onChange={handleModeChange}
              className="mr-1"
            />
            In-Clinic
          </label>
        </div>
  
        {/* Specialties */}
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">Specialities</h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {specialtiesList.map((spec) => (
              <label key={spec} className="text-sm">
                <input
                  type="checkbox"
                  value={spec}
                  checked={query.specialties?.split(",").includes(spec)}
                  onChange={handleSpecialtyChange}
                  className="mr-1"
                />
                {spec}
              </label>
            ))}
          </div>
        </div>
  
        {/* Sort */}
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">Sort By</h3>
          <label className="text-sm">
            <input
              type="radio"
              value="fees"
              checked={query.sort === "fees"}
              onChange={handleSortChange}
              className="mr-1"
            />
            Price Low-High
          </label>
          <label className="text-sm">
            <input
              type="radio"
              value="experience"
              checked={query.sort === "experience"}
              onChange={handleSortChange}
              className="mr-1"
            />
            Experience High-Low
          </label>
        </div>
      </div>
    );
  }
  
