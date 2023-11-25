import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export const FitnessPlan = ({ data }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Fitness Plan</Text>
      <Text style={styles.subtitle}>Body Fat Level: {data.fatLevel}%</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Training Program</Text>
        {data.trainingProgramList.map((program, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.day}>{program.day}</Text>
            {program.exercises.map((exercise, idx) => (
              <Text key={idx} style={styles.exercise}>
                {exercise}
              </Text>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diet Plan</Text>
        {data.diet.map((dayPlan, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.day}>{dayPlan.day}</Text>
            {Object.entries(dayPlan.meals).map(([mealTime, meal], idx) => (
              <Text key={idx} style={styles.meal}>
                {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}:{" "}
                {meal.toString()}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#303740", // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF", // Light text color
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // Light text color
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // Light text color
  },
  exercise: {
    fontSize: 16,
    paddingLeft: 10,
    color: "#D1D1D1", // Lighter text color for less important text
  },
  meal: {
    fontSize: 16,
    paddingLeft: 10,
    color: "#D1D1D1", // Lighter text color
  },
});
