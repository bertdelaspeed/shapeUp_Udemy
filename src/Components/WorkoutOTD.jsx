import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
const otdImage = require("../../assets/Images/workoutotd.jpg");

const WorkoutOTD = () => {
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity className="items-center justify-center">
      <View className="rounded-3xl overflow-hidden h-40 w-[80%]">
        <ImageBackground
          source={otdImage}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <View>
            <Text
              className="text-white/70 text-3xl tracking-tighter"
              style={{ fontFamily: "Lato_400Regular" }}
            >
              Workout Of The Day
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutOTD;
