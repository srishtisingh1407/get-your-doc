import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

export default function AutocompleteSearch({ doctors }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
    } else {
      const matches = doctors
        .filter((doc) =>
          doc.name.toLowerCase().includes(input.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
    }
  }, [input, doctors]);

  const handleSelect = (name) => {
    setInput(name);
    setSuggestions([]);
    router.push({
      pathname: "/",
      query: { ...router.query, search: name },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      handleSelect(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          data-testid="autocomplete-input"
          className="w-full bg-white outline-none"
          type="text"
          value={input}
          placeholder="Search doctors by name..."
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border rounded-lg shadow-md mt-1 w-full">
          {suggestions.map((doc) => (
            <div
              key={doc.id}
              data-testid="suggestion-item"
              onClick={() => handleSelect(doc.name)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {doc.name}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
