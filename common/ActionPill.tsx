import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ActionPill = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
  return (
    <TouchableOpacity className="flex flex-row items-center justify-center px-4 py-2 mt-2 border rounded-md bg-black/30 border-slate-500 w-96">
      {icon}
      <Text className="h-full mt-1 ml-4 bg-red text-slate-200 text-md">{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionPill;
