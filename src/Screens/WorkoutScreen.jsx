import { View, Text } from "react-native";
import React from "react";
import Welcome from "../Components/Welcome";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutOTD from "../Components/WorkoutOTD";
import Separator from "../Components/Separator";
import Category from "../Components/Category";
import Exercise from "../Components/Exercise";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const WorkoutScreen = () => {
  return (
    <SafeAreaView className="mx-[1%]">
      <Welcome />
      <GestureHandlerRootView>
        <ScrollView>
          <WorkoutOTD />
          <Separator />
          <Category />
          <Separator />
          <Exercise />
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
