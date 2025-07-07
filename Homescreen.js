import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import journalData from './data';

const emotionColors = {
  Happy: '#FFD54F',
  Sad: '#90A4AE',
  Angry: '#E57373',
  Anxious: '#64B5F6',
  Stressed: '#BA68C8'
};

const HomeScreen = ({ navigation }) => {
  const emotionCountByDate = {};

  journalData.forEach(({ date, emotion }) => {
    if (!emotionCountByDate[date]) emotionCountByDate[date] = {};
    emotionCountByDate[date][emotion] = (emotionCountByDate[date][emotion] || 0) + 1;
  });

  const dates = Object.keys(emotionCountByDate);
  const emotions = Object.keys(emotionColors);

  const barData = emotions.map((emotion, idx) => ({
    data: dates.map((d) => emotionCountByDate[d][emotion] || 0),
    svg: { fill: Object.values(emotionColors)[idx] },
    key: `bar-${emotion}`
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Mate – Mental Fitness 💙</Text>
      <Text style={styles.subtitle}>Weekly Emotional Overview</Text>

      <BarChart style={{ height: 200 }} data={barData} yAccessor={({ item }) => item} spacingInner={0.3} contentInset={{ top: 20, bottom: 10 }} />
      <XAxis style={{ marginTop: 10 }} data={dates} formatLabel={(value, index) => dates[index].slice(5)} svg={{ fontSize: 12 }} />

      <Text style={styles.section}>📓 Recent Entries</Text>
      <FlatList
        data={journalData}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.journalItem}>
            <Text style={{ fontWeight: 'bold' }}>{item.date} – {item.emotion}</Text>
            <Text>{item.entry}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Emotion Journal')}>
        <Text style={styles.buttonText}>+ New Journal Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 10 },
  section: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
  journalItem: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8, marginTop: 10 },
  button: { backgroundColor: '#1976d2', padding: 12, marginTop: 20, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center' }
});

export default HomeScreen;
