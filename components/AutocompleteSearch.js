import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AutocompleteSearch({ doctors }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = doctors
      .filter((doc) => doc.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3);
    setSuggestions(matches);
  }, [query, doctors]);

  const handleSelect = (name) => {
    setQuery(name);
    router.push({
      pathname: "/",
      query: { ...router.query, search: name },
    });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/",
      query: { ...router.query, search: query },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="autocomplete-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full p-2 border rounded"
        />
      </form>
      {suggestions.length > 0 && (
        <div className="border rounded mt-1 bg-white">
          {suggestions.map((doc) => (
            <div
              key={doc.id}
              data-testid="suggestion-item"
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(doc.name)}
            >
              {doc.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
