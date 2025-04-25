import { useRouter } from "next/router";
import { useState } from "react";
import { FiSearch } from "react-icons/fi"; 

export default function AutocompleteSearch({ doctors }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(router.query.search || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/",
      query: { ...router.query, search: inputValue },
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
        <div className="pl-4 text-gray-500">
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search doctors..."
          className="w-full p-3 rounded-full focus:outline-none bg-white"
        />
      </div>
    </form>
  );
}
