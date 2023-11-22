import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

export function QRCodeScanner() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;

  const handleBarCodeScanned = ({ type, data }) => {
    order.table = parseInt(data);
    navigation.navigate('ConfirmOrder', { order });
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <View style={styles.squareContainer} />
        <Text style={styles.infoText}>Aponte para o código QR da mesa.</Text>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareContainer: {
    width: 225,
    height: 225,
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
  },
  infoText: {
    marginTop: 32,
    fontSize: 18,
    color: 'white',
  },
});
