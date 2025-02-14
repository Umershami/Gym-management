import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AllPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const querySnapshot = await getDocs(collection(db, "trainingPlans"));
      const allPlans = querySnapshot.docs.map((doc) => doc.data());
      setPlans(allPlans); // Store all the plans in state
    };

    fetchPlans(); // Fetch all plans on mount
  }, []);

  // Group plans by disease
  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.disease]) {
      acc[plan.disease] = [];
    }
    acc[plan.disease].push(plan);
    return acc;
  }, {});

  return (
    <div>
      <h2>All Training Plans</h2>
      {Object.keys(groupedPlans).map((disease, index) => (
        <div key={index}>
          <h3>{disease}</h3>
          <div>
            {groupedPlans[disease].map((plan, idx) => (
              <div key={idx}>
                <h4>{plan.title}</h4>
                <p>{plan.description}</p>
                <p>Duration: {plan.duration} weeks</p>
                <p>Exercises: {plan.exercises.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPlans;
