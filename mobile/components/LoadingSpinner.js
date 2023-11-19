import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingSpinner = ({ size = 'large', color = '#0000ff' }) => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  