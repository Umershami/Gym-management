import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AddMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [selectedTrainingPlan, setSelectedTrainingPlan] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [diseases, setDiseases] = useState([
    { id: "asthma", name: "Asthma", plans: ["Asthma Management Plan 1", "Asthma Management Plan 2"] },
    { id: "diabetes", name: "Diabetes", plans: ["Diabetes Management Plan 1", "Diabetes Management Plan 2"] },
    { id: "hypertension", name: "Hypertension", plans: ["Hypertension Management Plan 1", "Hypertension Management Plan 2"] }
  ]);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainers"));
        const trainerData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainerData);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !address || !selectedTrainer || !selectedDisease || !selectedTrainingPlan) {
      setError("All fields are required!");
      return;
    }

    try {
      await addDoc(collection(db, "members"), {
        name,
        email,
        contact,
        address,
        trainer: selectedTrainer,
        disease: selectedDisease,
        trainingPlan: selectedTrainingPlan, // Save the selected training plan
      });

      // Reset form fields
      setName("");
      setEmail("");
      setContact("");
      setAddress("");
      setSelectedTrainer("");
      setSelectedDisease("");
      setSelectedTrainingPlan("");
      setError("");
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);
      setError("There was an error adding the member.");
    }
  };

  const handleDiseaseChange = (e) => {
    const diseaseId = e.target.value;
    setSelectedDisease(diseaseId);
    setSelectedTrainingPlan(""); 
  };

  const getTrainingPlansForDisease = (diseaseId) => {
    const disease = diseases.find(d => d.id === diseaseId);
    return disease ? disease.plans : [];
  };

  return (
    <div className="add-member-form">
      <h3>Add Member</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            placeholder="Enter contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Trainer:</label>
          <select
            value={selectedTrainer}
            onChange={(e) => setSelectedTrainer(e.target.value)}
          >
            <option value="">Select a Trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name} - {trainer.specialty}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Disease:</label>
          <select
            value={selectedDisease}
            onChange={handleDiseaseChange}
          >
            <option value="">Select a Disease</option>
            {diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Training Plan:</label>
          <select
            value={selectedTrainingPlan}
            onChange={(e) => setSelectedTrainingPlan(e.target.value)}
          >
            <option value="">Select a Training Plan</option>
            {getTrainingPlansForDisease(selectedDisease).map((plan, index) => (
              <option key={index} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMember;
