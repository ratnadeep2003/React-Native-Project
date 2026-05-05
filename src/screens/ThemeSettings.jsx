import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext.jsx';
import { themes, fontFamilies, fontSizes } from '../theme/theme.js';

const ThemeSettings = () => {
  const {
    theme, fontFamily, fontSize,
    activeTheme, setActiveTheme,
    activeFont, setActiveFont,
    activeFontSize, setActiveFontSize,
  } = useTheme();

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 20, paddingBottom: 40 },
    sectionLabel: {
      fontSize: fontSize - 1,
      fontWeight: '700',
      color: theme.primary,
      fontFamily,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginTop: 28,
      marginBottom: 12,
    },
    divider: {
      height: 2,
      backgroundColor: theme.primary,
      width: 32,
      marginBottom: 14,
      borderRadius: 2,
    },
    themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    themeCard: {
      width: '47%',
      borderRadius: 14,
      padding: 14,
      borderWidth: 2,
    },
    themeName: { fontWeight: '700', fontFamily, fontSize: fontSize - 1 },
    themeDots: { flexDirection: 'row', marginTop: 8, gap: 6 },
    dot: { width: 12, height: 12, borderRadius: 6 },
    optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    optionBtn: {
      paddingVertical: 9,
      paddingHorizontal: 18,
      borderRadius: 10,
      borderWidth: 1.5,
    },
    optionText: { fontWeight: '600', fontFamily, fontSize: fontSize - 1 },
    preview: {
      marginTop: 28,
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
    },
    previewTitle: {
      fontSize: fontSize + 4,
      fontWeight: '800',
      color: theme.text,
      fontFamily,
      marginBottom: 6,
    },
    previewBody: {
      fontSize: fontSize,
      color: theme.subtext,
      fontFamily,
      lineHeight: fontSize * 1.6,
    },
  });

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.inner}>

        {/* COLOR THEMES */}
        <Text style={s.sectionLabel}>Color Themes</Text>
        <View style={s.divider} />
        <View style={s.themeGrid}>
          {Object.entries(themes).map(([key, t]) => (
            <TouchableOpacity
              key={key}
              style={[
                s.themeCard,
                { backgroundColor: t.surface, borderColor: activeTheme === key ? t.primary : t.border },
              ]}
              onPress={() => setActiveTheme(key)}
              activeOpacity={0.8}
            >
              <Text style={[s.themeName, { color: t.text }]}>{t.name}</Text>
              <View style={s.themeDots}>
                <View style={[s.dot, { backgroundColor: t.primary }]} />
                <View style={[s.dot, { backgroundColor: t.accent }]} />
                <View style={[s.dot, { backgroundColor: t.success }]} />
                <View style={[s.dot, { backgroundColor: t.danger }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* FONT FAMILY */}
        <Text style={s.sectionLabel}>Font Family</Text>
        <View style={s.divider} />
        <View style={s.optionRow}>
          {Object.entries(fontFamilies).map(([key, f]) => (
            <TouchableOpacity
              key={key}
              style={[
                s.optionBtn,
                {
                  backgroundColor: activeFont === key ? theme.primary : theme.card,
                  borderColor: activeFont === key ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setActiveFont(key)}
              activeOpacity={0.8}
            >
              <Text style={[s.optionText, { color: activeFont === key ? '#fff' : theme.text }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FONT SIZE */}
        <Text style={s.sectionLabel}>Font Size</Text>
        <View style={s.divider} />
        <View style={s.optionRow}>
          {Object.entries(fontSizes).map(([key, f]) => (
            <TouchableOpacity
              key={key}
              style={[
                s.optionBtn,
                {
                  backgroundColor: activeFontSize === key ? theme.primary : theme.card,
                  borderColor: activeFontSize === key ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setActiveFontSize(key)}
              activeOpacity={0.8}
            >
              <Text style={[s.optionText, { color: activeFontSize === key ? '#fff' : theme.text }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIVE PREVIEW */}
        <Text style={s.sectionLabel}>Live Preview</Text>
        <View style={s.divider} />
        <View style={s.preview}>
          <Text style={s.previewTitle}>ComponentVault Preview</Text>
          <Text style={s.previewBody}>
            This text reflects your current font family and size selection in real time.
            Switch themes and sizes above to see the changes applied instantly.
          </Text>
        </View>

      </View>
    </ScrollView>
  );
};

export default ThemeSettings;
