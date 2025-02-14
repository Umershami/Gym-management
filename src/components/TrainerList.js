import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const TrainerList = ({ trainers, setTrainerList }) => {
  const [editTrainer, setEditTrainer] = useState(null);  // Holds the trainer being edited

  // Handle deleting a trainer
  const handleDelete = async (trainerId) => {
    try {
      await deleteDoc(doc(db, "trainers", trainerId));  // Delete trainer from Firestore
      setTrainerList((prev) => prev.filter((trainer) => trainer.id !== trainerId));  // Remove from state
      alert("Trainer deleted successfully!");
    } catch (error) {
      console.error("Error deleting trainer:", error);
      alert("Error deleting trainer.");
    }
  };

  // Handle updating a trainer
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTrainer.name || !editTrainer.specialty || !editTrainer.experience || !editTrainer.contact) {
      alert("All fields are required!");
      return;
    }

    try {
      const trainerDocRef = doc(db, "trainers", editTrainer.id); // Get reference to the specific trainer
      await updateDoc(trainerDocRef, {
        name: editTrainer.name,
        specialty: editTrainer.specialty,
        experience: editTrainer.experience,
        contact: editTrainer.contact,
        description: editTrainer.description,
      });
      setTrainerList((prev) =>
        prev.map((trainer) =>
          trainer.id === editTrainer.id ? { ...trainer, ...editTrainer } : trainer
        )
      );
      setEditTrainer(null);  // Reset edit form
      alert("Trainer updated successfully!");
    } catch (error) {
      console.error("Error updating trainer:", error);
      alert("Error updating trainer.");
    }
  };

  // Handle change in edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTrainer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="trainer-list">
      {editTrainer ? (
        <div>
          <h3>Update Trainer</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={editTrainer.name}
              onChange={handleChange}
              placeholder="Trainer Name"
            />
            <input
              type="text"
              name="specialty"
              value={editTrainer.specialty}
              onChange={handleChange}
              placeholder="Specialty"
            />
            <input
              type="text"
              name="experience"
              value={editTrainer.experience}
              onChange={handleChange}
              placeholder="Experience"
            />
            <input
              type="text"
              name="contact"
              value={editTrainer.contact}
              onChange={handleChange}
              placeholder="Contact"
            />
            <textarea
              name="description"
              value={editTrainer.description}
              onChange={handleChange}
              placeholder="Description"
            ></textarea>
            <button type="submit">Update Trainer</button>
            <button type="button" onClick={() => setEditTrainer(null)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <ul>
          {trainers.map((trainer) => (
            <li key={trainer.id}>
              <strong>{trainer.name}</strong> - {trainer.specialty}
              <br />
              <em>Experience: {trainer.experience} years</em>
              <br />
              <p>{trainer.description}</p>
              <p>Contact: {trainer.contact}</p>
              <button onClick={() => setEditTrainer(trainer)}>Edit</button>
              <button onClick={() => handleDelete(trainer.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerList;
