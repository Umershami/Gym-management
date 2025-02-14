// AddTrainingPlan.js (Add Training Plan Form)
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddTrainingPlan = () => {
  const [planName, setPlanName] = useState("");
  const [duration, setDuration] = useState("");
  const [details, setDetails] = useState("");

  const handleAddPlan = async () => {
    try {
      // Add training plan to Firestore
      await addDoc(collection(db, "trainingPlans"), {
        planName,
        duration,
        details,
        createdAt: new Date(),
      });
      alert("Training Plan added successfully!");
      setPlanName("");
      setDuration("");
      setDetails("");
    } catch (error) {
      console.error("Error adding training plan: ", error);
      alert("Error adding training plan: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add New Training Plan</h2>
      <input
        type="text"
        placeholder="Training Plan Name"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration (weeks)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button onClick={handleAddPlan}>Add Plan</button>
    </div>
  );
};

export default AddTrainingPlan;
