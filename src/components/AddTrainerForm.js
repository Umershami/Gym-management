import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddTrainerForm = ({ setTrainerList }) => {
  const [trainerName, setTrainerName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trainerName || !specialty || !experience || !qualification || !contact) {
      setError("All fields are required!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "trainers"), {
        name: trainerName,
        specialty,
        experience,
        qualification,
        contact,
        description,
      });
      
      setTrainerList(prev => [
        ...prev, 
        { id: docRef.id, name: trainerName, specialty, experience, qualification, contact, description }
      ]);
      
      // Reset form fields
      setTrainerName("");
      setSpecialty("");
      setExperience("");
      setQualification("");
      setContact("");
      setDescription("");
      setError("");
      alert("Trainer added successfully!");
    } catch (error) {
      console.error("Error adding trainer:", error);
      setError("There was an error adding the trainer.");
    }
  };

  return (
    <div className="add-trainer-form">
      <h3>Add Trainer</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Trainer Name:</label>
          <input
            type="text"
            value={trainerName}
            placeholder="Trainer Name"
            onChange={(e) => setTrainerName(e.target.value)}
          />
        </div>
        <div>
          <label>Specialty:</label>
          <input
            type="text"
            value={specialty}
            placeholder="Speciality"
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>
        <div>
          <label>Experience (Years):</label>
          <input
            type="text"
            value={experience}
            placeholder="Experience"
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div>
          <label>Qualification:</label>
          <input
            type="text"
            value={qualification}
            placeholder="qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            placeholder="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea className="textarea"
            value={description}
            placeholder="Desciption"
            
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Trainer</button>
      </form>
    </div>
  );
};

export default AddTrainerForm;
