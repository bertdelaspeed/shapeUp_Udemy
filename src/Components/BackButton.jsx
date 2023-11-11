import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="absolute top-14 left-2"
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
