export const specialtiesList = [
    "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist",
    "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist",
    "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist",
    "Psychiatrist", "Urologist", "Dietitian/Nutritionist", "Psychologist",
    "Sexologist", "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ];
  
  export function filterDoctors(doctors, query) {
    let filtered = [...doctors];
  
    if (query.search) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(query.search.toLowerCase())
      );
    }
  
    if (query.mode) {
      filtered = filtered.filter((d) =>
        query.mode === "video" ? d.videoConsult : d.inClinicConsult
      );
    }
  
    if (query.specialties) {
      const selected = query.specialties.split(",");
      filtered = filtered.filter((d) =>
        d.specialities.some((spec) => selected.includes(spec.name))
      );
    }
  
    if (query.sort === "fees") {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (query.sort === "experience") {
      filtered.sort((a, b) => b.experience - a.experience);
    }
  
    return filtered;
  }
  