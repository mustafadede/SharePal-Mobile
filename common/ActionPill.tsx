import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ActionPill = ({
  title,
  icon,
  type = "bottomsheet",
  additionalClasses,
  status = false,
}: {
  title: string;
  icon: React.ReactNode;
  type?: string;
  additionalClasses?: string;
  status?: boolean;
}) => {
  return (
    <TouchableOpacity
      className={
        type === "bottomsheet"
          ? "flex flex-row items-center justify-center px-4 py-2 mt-2 border rounded-md bg-black/30 border-slate-500 w-96"
          : status
          ? `flex flex-row items-center justify-center px-4 py-2 mt-2 border rounded-md border-black/30 border-fuchsia-600 ${additionalClasses}`
          : `flex flex-row w-fit items-center justify-center px-4 py-2 mt-2 border rounded-xl bg-black/30 border-slate-500 ${additionalClasses}`
      }
    >
      {icon}
      <Text
        className={
          type === "bottomsheet" ? "text-sm text-slate-300 ml-2" : status ? "text-sm text-fuchsia-600 ml-2" : "text-sm text-slate-300 ml-2"
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionPill;
