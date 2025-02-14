import React, { useState, useEffect } from "react";

const TrainingPlanList = ({ disease, setSelectedPlan }) => {
  const [plans, setPlans] = useState([]);

  // Hardcoded training plans for all diseases
  const allPlans = [
    { disease: "Diabetes", title: "Diabetes Training", description: "Training plan for managing diabetes", duration: 4, exercises: ["Exercise 1", "Exercise 2"] },
    { disease: "Hypertension", title: "Hypertension Training", description: "Training plan for managing hypertension", duration: 5, exercises: ["Exercise 3", "Exercise 4"] },
    { disease: "Asthma", title: "Asthma Training", description: "Training plan for asthma control", duration: 6, exercises: ["Exercise 5", "Exercise 6"] },
  ];

  useEffect(() => {
    const fetchPlans = () => {
      if (!disease || disease === "None") {
        setPlans([]); // No plans for "None" disease
        return;
      }

      // Filter plans based on the selected disease
      const filteredPlans = allPlans.filter((plan) =>
        plan.disease && plan.disease.toLowerCase().includes(disease.toLowerCase())
      );

      // Set filtered plans if disease is valid
      setPlans(filteredPlans);
    };

    fetchPlans(); // Fetch plans when the disease changes
  }, [disease]);

  return (
    <div>
      <h3>Training Plans for {disease || "Your Condition"}</h3>
      {plans.length > 0 ? (
        <div>
          {plans.map((plan, index) => (
            <div key={index}>
              <h4>{plan.title}</h4>
              <p><strong>Description:</strong> {plan.description}</p>
              <p><strong>Duration:</strong> {plan.duration} weeks</p>
              <p><strong>Exercises:</strong></p>
              <ul>
                {plan.exercises.map((exercise, idx) => (
                  <li key={idx}>{exercise}</li>
                ))}
              </ul>
              <button onClick={() => setSelectedPlan(plan.title)}>Select Plan</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No training plans available for this disease.</p>
      )}
    </div>
  );
};

export default TrainingPlanList;
