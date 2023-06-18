import React from "react";
import { useEffect, useState } from "react";

export const ConverterStatus = () => {
  const [loadingObject, setLoadingObject] = useState({
    Status: "Loading",
    Iterations: 0,
  });

  useEffect(() => {
    // Simulating loading process with a delay
    const timer = setInterval(() => {
      setLoadingObject((prevObject) => {
        const nextStatus = getNextStatus(prevObject.Status);
        const nextIterations =
          nextStatus === "Loading" ? prevObject.Iterations + 1 : 0;
        return {
          Status: nextStatus,
          Iterations: nextIterations,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getNextStatus = (currentStatus) => {
    const statusEnum = [
      "Loading",
      "Processing",
      "Analyzing",
      "Fetching",
      "Rendering",
      "Complete",
    ];
    const currentStatusIndex = statusEnum.indexOf(currentStatus);
    return statusEnum[currentStatusIndex + 1] || "Complete";
  };

  const getStatusAnimation = (status) => {
    if (status === "Complete") {
      return "";
    } else {
      return "animate-pulse";
    }
  };

  const getStatusText = (status) => {
    if (status === "Complete") {
      return "Complete";
    } else {
      return `${status}...`;
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <span className="font-bold mr-2">Status:</span>
        <span className={`text-blue-500 ${getStatusAnimation(loadingObject.Status)}`}>
          {getStatusText(loadingObject.Status)}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-bold mr-2">Iterations:</span>
        <span>{loadingObject.Iterations}</span>
      </div>
    </div>
  );
};
