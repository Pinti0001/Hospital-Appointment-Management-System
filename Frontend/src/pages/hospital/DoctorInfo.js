import React, { useState } from "react";
import { createDoctor } from "../services/Api";

const CreateDoctor = ({ hospitals = [], onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    hospitalId: "",
    availableSlots: [{ date: "", time: "" }],
  });

  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle search query input and filter hospitals
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredHospitals(
      hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Handle hospital selection
  const handleHospitalSelect = (hospitalId) => {
    setFormData({ ...formData, hospitalId });
    setSearchQuery(""); // Clear search query
    setFilteredHospitals(hospitals); // Reset hospital list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const index = e.target.dataset.index;

    if (index !== undefined) {
      const updatedSlots = [...formData.availableSlots];
      updatedSlots[index] = { ...updatedSlots[index], [name]: value };
      setFormData({ ...formData, availableSlots: updatedSlots });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSlot = () => {
    setFormData({
      ...formData,
      availableSlots: [...formData.availableSlots, { date: "", time: "" }],
    });
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = formData.availableSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, availableSlots: updatedSlots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formattedData = {
        ...formData,
        availableSlots: formData.availableSlots.map((slot) => ({
          date: new Date(slot.date).toISOString(),
          time: slot.time,
        })),
      };

      const newDoctor = await createDoctor(formattedData);
      setSuccess("Doctor added successfully!");
      setFormData({
        name: "",
        specialization: "",
        hospitalId: "",
        availableSlots: [{ date: "", time: "" }],
      });
      if (onDoctorAdded) onDoctorAdded(newDoctor);
    } catch (err) {
      setError(err.message || "Failed to add doctor. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>
      {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-600 p-2 mb-4 rounded">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="specialization" className="block font-medium mb-2">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        {/* Hospital Input with Filtered List */}
        <div className="mb-4">
          <label htmlFor="hospitalId" className="block font-medium mb-2">Hospital</label>
          <input
            type="text"
            id="hospitalId"
            name="hospitalId"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Search for a hospital"
          />
          {searchQuery && (
            <ul className="bg-white shadow-md mt-2 rounded max-h-60 overflow-auto">
              {filteredHospitals.map((hospital) => (
                <li
                  key={hospital._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleHospitalSelect(hospital._id)}
                >
                  {hospital.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Available Slots Section */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Available Slots</label>
          {formData.availableSlots.map((slot, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="date"
                name="date"
                value={slot.date}
                onChange={handleChange}
                data-index={index}
                className="px-4 py-2 border rounded w-1/2"
                required
              />
              <input
                type="time"
                name="time"
                value={slot.time}
                onChange={handleChange}
                data-index={index}
                className="px-4 py-2 border rounded w-1/2"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveSlot(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSlot}
            className="text-blue-500"
          >
            Add Slot
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default CreateDoctor;
