export default function DoctorCard({ doctor }) {
  return (
    <div className="relative bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
      <div className="absolute top-0 right-0 w-12 h-2 rounded-bl-lg bg-cyan-950"></div>

      <img
        src={doctor.photo}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />

      <h2 className="text-xl font-semibold mb-1">{doctor.name}</h2>

      <p className="text-gray-600 text-sm mb-1">
        {doctor.specialities.map((s) => s.name).join(", ")}
      </p>

      <p className="text-gray-500 text-sm mb-1">{doctor.experience}</p>

      <p className="text-gray-800 font-medium mb-1">{doctor.fees}</p>

      <p className="text-gray-500 text-sm mb-2">
        📍 {doctor.clinic?.address?.locality}, {doctor.clinic?.address?.city}
      </p>

      <a
        href={`https://maps.google.com/?q=${doctor.clinic?.address?.location}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-950 text-xs underline mb-4"
      >
        View on Map
      </a>

      <button className="mt-auto bg-cyan-950 hover:bg-cyan-700 text-white py-2 px-6 rounded-full text-sm transition">
        Book Appointment
      </button>
    </div>
  );
}
