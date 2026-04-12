import { useState } from "react";

export const useMembers = () => {
  const [showPlans, setShowPlans] = useState(false);

  const togglePlans = () => {
    setShowPlans((prev) => !prev);
  };

  return {
    showPlans,
    togglePlans,
  };
};