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
  
    if (query.mode === "video") {
      filtered = filtered.filter((d) => d.video_consult);
    } else if (query.mode === "clinic") {
      filtered = filtered.filter((d) => d.in_clinic);
    }
  
    if (query.specialties) {
      const selected = query.specialties.split(",");
      filtered = filtered.filter((d) =>
        d.specialities?.some((spec) => selected.includes(spec.name))
      );
    }
  

    if (query.sort === "fees") {
      filtered.sort((a, b) =>
        parseInt(a.fees.replace(/[^\d]/g, '')) - parseInt(b.fees.replace(/[^\d]/g, ''))
      );
    } else if (query.sort === "experience") {
      filtered.sort((a, b) => {
        const getYears = (exp) => {
          const match = exp.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        };
        return getYears(b.experience) - getYears(a.experience);
      });
    }
  
    return filtered;
  }
  