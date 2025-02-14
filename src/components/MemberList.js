import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const MemberList = ({ members, setMemberList }) => {
  const [editMember, setEditMember] = useState(null);  // Holds the member being edited

  // Handle deleting a member
  const handleDelete = async (memberId) => {
    try {
      await deleteDoc(doc(db, "members", memberId));  // Delete member from Firestore
      setMemberList((prev) => prev.filter((member) => member.id !== memberId));  // Remove from state
      alert("Member deleted successfully!");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Error deleting member.");
    }
  };

  // Handle updating a member
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editMember.name || !editMember.email || !editMember.contact || !editMember.address) {
      alert("All fields are required!");
      return;
    }

    try {
      const memberDocRef = doc(db, "members", editMember.id); // Get reference to the specific member
      const updatedData = {
        name: editMember.name,
        email: editMember.email,
        contact: editMember.contact,
        address: editMember.address,
      };
      if (editMember.payment) {
        updatedData.payment = editMember.payment;  // Only update payment if it exists
      }
      await updateDoc(memberDocRef, updatedData);
      setMemberList((prev) =>
        prev.map((member) =>
          member.id === editMember.id ? { ...member, ...editMember } : member
        )
      );
      setEditMember(null);  // Reset edit form
      alert("Member updated successfully!");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Error updating member.");
    }
  };

  // Handle change in edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMember((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="member-list">
      {editMember ? (
        <div>
          <h3>Update Member</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={editMember.name}
              onChange={handleChange}
              placeholder="Member Name"
            />
            <input
              type="email"
              name="email"
              value={editMember.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="contact"
              value={editMember.contact}
              onChange={handleChange}
              placeholder="Contact"
            />
            <input
              type="text"
              name="address"
              value={editMember.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="payment"
              value={editMember.payment || ""}
              onChange={handleChange}
              placeholder="Payment Method"
            />
            <button type="submit">Update Member</button>
            <button type="button" onClick={() => setEditMember(null)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <strong>{member.name}</strong> - {member.email}
              <button onClick={() => setEditMember(member)}>Edit</button>
              <button onClick={() => handleDelete(member.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
