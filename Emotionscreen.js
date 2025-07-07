import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

const emotions = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Angry', emoji: '😡' },
  { name: 'Anxious', emoji: '😰' },
  { name: 'Stressed', emoji: '😞' }
];

const EmotionScreen = () => {
  const [selected, setSelected] = useState(null);
  const [entry, setEntry] = useState('');

  const getPrompt = (e) => {
    switch (e) {
      case 'Happy': return "What made you happy today?";
      case 'Sad': return "What's making you feel low?";
      case 'Angry': return "What triggered your anger?";
      case 'Anxious': return "What’s causing your anxiety? Try deep breathing.";
      case 'Stressed': return "What's overwhelming you?";
      default: return "";
    }
  };

  const saveEntry = () => {
    const date = new Date().toISOString().split('T')[0];
    console.log(`[SAVED] ${date} | ${selected}: ${entry}`);
    Alert.alert("Saved!", `Your ${selected} journal for ${date} is saved.`);
    setSelected(null);
    setEntry('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.emotionContainer}>
        {emotions.map((e) => (
          <TouchableOpacity key={e.name} style={[styles.emotionButton, selected === e.name && styles.selected]} onPress={() => setSelected(e.name)}>
            <Text style={styles.emoji}>{e.emoji}</Text>
            <Text>{e.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
        <>
          <Text style={styles.prompt}>{getPrompt(selected)}</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your thoughts..."
            multiline
            value={entry}
            onChangeText={setEntry}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
            <Text style={styles.saveText}>💾 Save Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.therapistButton}>
            <Text style={styles.therapistText}>👨‍⚕️ Talk to a Therapist</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  emotionContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  emotionButton: { padding: 10, alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, width: '30%', margin: 5 },
  selected: { backgroundColor: '#b2ebf2' },
  emoji: { fontSize: 30 },
  prompt: { fontSize: 16, marginVertical: 10 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, minHeight: 60, padding: 10 },
  saveButton: { backgroundColor: '#00796b', padding: 12, borderRadius: 10, marginTop: 10 },
  saveText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  therapistButton: { backgroundColor: '#3949ab', padding: 12, borderRadius: 10, marginTop: 10 },
  therapistText: { color: '#fff', textAlign: 'center', fontSize: 16 }
});

export default EmotionScreen;
