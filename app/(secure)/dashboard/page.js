import AddCategoryForm from "@/components/forms/AddCategoryForm";
import AddEquipmentForm from "@/components/forms/AddEquipmentForm";
import UserInfo from "@/components/UserInfo";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <UserInfo />
      <div className="flex justify-center gap-4">
        <AddCategoryForm />
        <AddEquipmentForm />
      </div>
    </div>
  );
};

export default Dashboard;
