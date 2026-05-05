import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext.jsx';

const ComponentLibrary = () => {
  const { theme, fontFamily, fontSize } = useTheme();
  const [inputVal, setInputVal] = useState('');

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 20, paddingBottom: 40 },

    sectionLabel: {
      fontSize: fontSize,
      fontWeight: '700',
      color: theme.primary,
      fontFamily,
      marginTop: 28,
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },

    // Buttons
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    btn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    btnText: { fontSize: fontSize, fontWeight: '600', fontFamily, color: '#fff' },

    // Cards
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 10,
    },
    cardTitle: { fontSize: fontSize + 1, fontWeight: '700', color: theme.text, fontFamily, marginBottom: 4 },
    cardSub: { fontSize: fontSize - 1, color: theme.subtext, fontFamily, lineHeight: 20 },

    // Input
    input: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      color: theme.text,
      fontSize: fontSize,
      fontFamily,
    },

    // Alerts
    alert: {
      padding: 14,
      borderRadius: 10,
      borderLeftWidth: 4,
      marginBottom: 10,
    },
    alertText: { fontSize: fontSize - 1, fontFamily, fontWeight: '500' },
  });

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.inner}>

        {/* BUTTONS */}
        <Text style={s.sectionLabel}>Buttons</Text>
        <View style={s.row}>
          {[
            { label: 'Primary', bg: theme.primary },
            { label: 'Success', bg: theme.success },
            { label: 'Danger', bg: theme.danger },
          ].map(b => (
            <TouchableOpacity key={b.label} style={[s.btn, { backgroundColor: b.bg }]} activeOpacity={0.8}>
              <Text style={s.btnText}>{b.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[s.btn, { borderWidth: 1.5, borderColor: theme.primary, backgroundColor: 'transparent' }]}
            activeOpacity={0.8}
          >
            <Text style={[s.btnText, { color: theme.primary }]}>Outline</Text>
          </TouchableOpacity>
        </View>

        {/* CARDS */}
        <Text style={s.sectionLabel}>Cards</Text>
        {[
          { title: 'Feature Card', sub: 'A simple card for displaying grouped content with a title and description.' },
          { title: 'Info Card', sub: 'Useful for tips, notifications, or any short contextual information.' },
        ].map(c => (
          <View key={c.title} style={s.card}>
            <Text style={s.cardTitle}>{c.title}</Text>
            <Text style={s.cardSub}>{c.sub}</Text>
          </View>
        ))}

        {/* TEXT INPUT */}
        <Text style={s.sectionLabel}>Text Input</Text>
        <TextInput
          style={s.input}
          value={inputVal}
          onChangeText={setInputVal}
          placeholder="Type something..."
          placeholderTextColor={theme.subtext}
        />

        {/* ALERTS */}
        <Text style={s.sectionLabel}>Alerts</Text>
        {[
          { label: '✓  Success — Action completed.', color: theme.success },
          { label: '⚠  Warning — Check your input.', color: theme.warning },
          { label: '✕  Error — Something went wrong.', color: theme.danger },
          { label: 'ℹ  Info — Here is some information.', color: theme.primary },
        ].map(a => (
          <View key={a.label} style={[s.alert, { backgroundColor: a.color + '18', borderLeftColor: a.color }]}>
            <Text style={[s.alertText, { color: a.color }]}>{a.label}</Text>
          </View>
        ))}

      </View>
    </ScrollView>
  );
};

export default ComponentLibrary;