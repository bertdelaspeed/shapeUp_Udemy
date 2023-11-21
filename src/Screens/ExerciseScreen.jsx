import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getDownloadURL, ref } from "@firebase/storage";
import { storage } from "../../Firebase/config";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import BackButton from "../Components/BackButton";

const countDownAudio = require("../../assets/audio/countdownaudio.mp3");

const ExerciseScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const initialTime = 5;
  const minTime = 5;

  const [gifUrl, setGifUrl] = useState(null);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [countDownSound, setCountDownSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(countDownAudio);
    setCountDownSound(sound);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsAudioPlaying(false);
      }
    });
    await sound.playAsync();
    setIsAudioPlaying(true);
  }

  // useEffect(() => {
  //   return countDownSound
  //     ? () => {
  //         countDownSound.unloadAsync();
  //       }
  //     : undefined;
  // }, [countDownSound]);

  const fetchGifUrl = async () => {
    try {
      const storageRef = ref(storage, `AllExercises/${item.gif_url}`);
      const url = await getDownloadURL(storageRef);
      setGifUrl(url);
    } catch (error) {
      console.log("error = ", error);
    }
  };

  useEffect(() => {
    fetchGifUrl();
  }, []);

  const handleDecreaseTime = () => {
    if (!isRunning && time > minTime) {
      setTime((prevTime) => prevTime - 10);
    }
  };
  const handleIncreaseTime = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 10);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFirstTime(true);
    setTime(initialTime);

    if (countDownSound && isAudioPlaying) {
      countDownSound.stopAsync();
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    let countDownInterval;
    // console.log("inside time decrease useeffect ");
    if (isRunning && time > 0) {
      countDownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);

        if (time === 4) {
          // console.log("time is 4");
          playSound();
        }
      }, 1000);
    } else {
      setIsRunning(false);
      clearInterval(countDownInterval);
    }

    return () => {
      clearInterval(countDownInterval);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    if (!isRunning && isFirstTime) {
      setIsFirstTime(false);
      setIsRunning(true);
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  return (
    <View className="flex-1">
      {gifUrl ? (
        <Image source={{ uri: gifUrl }} className="w-full h-80" />
      ) : (
        <View className="items-center justify-center w-full h-80">
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
      <BackButton />
      <ScrollView>
        <View className="mt-4 mx-3">
          <Text className="text-2xl font-bold text-center mb-1">
            {item.title}
          </Text>
          <View className="flex-row">
            {item.category.split(",").map((cat, index) => (
              <View key={index} className="mr-2">
                <View className="bg-gray-300 px-2 rounded-2xl pb-1">
                  <Text className="text-fuchsia-500">#{cat}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="flex-row items-center space-x-2 mt-2">
            <Text className="font-semibold  text-blue-500">Intensity:</Text>
            <Text className="text-cyan-400 italic text-base">
              {item.intensity}
            </Text>
          </View>
          <Text className="text-xl font-semibold mt-4">Instructions:</Text>
          <View className="mt-2">
            {item.instructions.map((instruction) => (
              <View
                key={instruction.step}
                className="flex-row items-center mb-2"
              >
                <Text className="text-base text-gray-600">
                  {instruction.step}.
                </Text>
                <Text className="ml-2 text-base">{instruction.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-4 flex-row items-center justify-center space-x-3">
          <TouchableOpacity
            onPress={handleDecreaseTime}
            className="items-center justify-center w-14 h-14 bg-red-500 rounded-full"
          >
            <Text className="text-white text-5xl">-</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold">{time} secs</Text>
          <TouchableOpacity
            onPress={handleIncreaseTime}
            className="items-center justify-center w-14 h-14 bg-green-500 rounded-full"
          >
            <Text className="text-white text-3xl">+</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 flex-row items-center justify-center mb-10 space-x-4">
          <TouchableOpacity
            onPress={isRunning ? handlePause : handleStart}
            disabled={time === 0}
          >
            <Text
              className={`text-blue-500 text-xl py-2 border rounded-lg border-blue-500 px-4 ${
                time === 0 ? "opacity-50" : ""
              }`}
            >
              {isRunning ? "PAUSE" : "START"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset}>
            <Text className="text-gray-500 text-xl py-2 border rounded-lg border-gray-500 px-4">
              RESET
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExerciseScreen;
