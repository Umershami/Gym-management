import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import AddMember from "./AddMember";
import MemberList from "./MemberList";
import AddTrainerForm from "./AddTrainerForm";
import TrainerList from "./TrainerList";
import TrainingPlanList from "./TrainingPlanList";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainingPlans, setTrainingPlans] = useState([]);

  // Fetch Members, Trainers, and Training Plans
  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "members"));
      const memberData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(memberData);
    };

    const fetchTrainers = async () => {
      const querySnapshot = await getDocs(collection(db, "trainers"));
      const trainerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrainers(trainerData);
    };

    const fetchTrainingPlans = async () => {
      const querySnapshot = await getDocs(collection(db, "trainingPlans"));
      const planData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrainingPlans(planData);
    };

    // Fetch data
    fetchMembers();
    fetchTrainers();
    fetchTrainingPlans();
  }, []);

  return (
    <div className="container">
      <h1>Gym Management System Dashboard</h1>

      {/* Member Management Section */}
      <div className="member-management">
        <h2>Member Management</h2>
        <AddMember trainers={trainers} />
        <h3>Member Information</h3>
        <MemberList members={members} setMemberList={setMembers} />
      </div>

      {/* Trainer Management Section */}
      <div className="trainer-management">
        <h2>Trainer Management</h2>
        <AddTrainerForm setTrainerList={setTrainers} />
        <h3>Trainer Information</h3>
        <TrainerList trainers={trainers} setTrainerList={setTrainers} />
      </div>

      {/* Training Plans Section */}
      <div className="training-plans">
        <h2>Training Plans</h2>
        <TrainingPlanList trainingPlans={trainingPlans} />
      </div>
    </div>
  );
};

export default Dashboard;
