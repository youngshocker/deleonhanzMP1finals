import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const App = () => {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('F');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default background color

  const handleTemperatureChange = (text) => {
    // Check if the input is numeric
    if (!isNaN(text)) {
      setTemperature(text);
      updateBackgroundColor(text);
    }
  };

  const updateBackgroundColor = (text) => {
    const temp = parseFloat(text);
    let newColor;
    if (scale === 'F') {
      newColor = temp >= 32 ? '#FF6347' : '#87CEEB'; // Fahrenheit
    } else {
      newColor = temp >= 0 ? '#87CEEB' : '#FF6347'; // Celsius
    }
    setBackgroundColor(newColor);
  };

  const convertTemperature = () => {
    if (scale === 'F') {
      return ((parseFloat(temperature) - 32) * 5) / 9;
    } else {
      return (parseFloat(temperature) * 9) / 5 + 32;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Temperature Converter</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTemperatureChange}
        value={temperature}
        keyboardType="numeric"
        placeholder="Enter temperature"
      />
      <Text style={styles.result}>
        {scale === 'F' ? 'Celsius: ' : 'Fahrenheit: '}
        {convertTemperature().toFixed(2)}
      </Text>
      <Text style={styles.scaleSwitch} onPress={() => setScale(scale === 'F' ? 'C' : 'F')}>
        Switch to {scale === 'F' ? 'Celsius' : 'Fahrenheit'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scaleSwitch: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

export default App;