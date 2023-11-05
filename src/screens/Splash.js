import React from 'react';
import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export function Splash({ onComplete }) {
  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded && status.didJustFinish) {
      onComplete();
    }
  }

  return (
    <Video
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      source={require('../../assets/splash.mp4')}
      shouldPlay
      isLooping={false}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
    />
  );
}