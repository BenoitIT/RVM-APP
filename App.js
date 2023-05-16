import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center item-center">
      <View className="bg-blue-400 h-2/4 flex item-center justify-center">
      <Text className="text-white font-bold text-lg">Open up App.js to start working on your apppp!</Text>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}


