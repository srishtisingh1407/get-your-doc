export default function DoctorCard({ doctor }) {
    return (
      <div className="relative bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
        {/* Small top colored bar */}
        <div className="absolute top-0 right-0 w-12 h-2 rounded-bl-lg bg-pink-500"></div>
  
        {/* Doctor Photo */}
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
  
        {/* Doctor Name */}
        <h2 className="text-xl font-semibold mb-1">{doctor.name}</h2>
  
        {/* Specialties */}
        <p className="text-gray-600 text-sm mb-1">
          {doctor.specialities.map((s) => s.name).join(", ")}
        </p>
  
        {/* Experience */}
        <p className="text-gray-500 text-sm mb-1">{doctor.experience}</p>
  
        {/* Fees */}
        <p className="text-gray-800 font-medium mb-1">{doctor.fees}</p>
  
        {/* Location */}
        <p className="text-gray-500 text-sm mb-2">
          📍 {doctor.clinic?.address?.locality}, {doctor.clinic?.address?.city}
        </p>
  
        {/* View on map */}
        <a
          href={`https://maps.google.com/?q=${doctor.clinic?.address?.location}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-xs underline mb-4"
        >
          View on Map
        </a>
  
        {/* Book Button */}
        <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full text-sm transition">
          Book Appointment
        </button>
      </div>
    );
  }
  