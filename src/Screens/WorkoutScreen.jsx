import { View, Text } from "react-native";
import React from "react";
import Welcome from "../Components/Welcome";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutOTD from "../Components/WorkoutOTD";
import Separator from "../Components/Separator";
import Category from "../Components/Category";
import Exercise from "../Components/Exercise";

const WorkoutScreen = () => {
  return (
    <SafeAreaView className="mx-[1%]">
      <Welcome />
      <WorkoutOTD />
      <Separator />
      <Category />
      <Separator />
      <Exercise />
    </SafeAreaView>
  );
};

export default WorkoutScreen;
