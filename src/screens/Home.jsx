import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext.jsx';

const Home = ({ onNavigate }) => {
  const { theme, fontFamily, fontSize } = useTheme();

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 24, paddingBottom: 40 },
    hero: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.border,
    },
    heroTitle: {
      fontSize: fontSize + 12,
      fontWeight: '800',
      color: theme.text,
      fontFamily,
      lineHeight: (fontSize + 12) * 1.2,
    },
    heroAccent: { color: theme.primary },
    heroSub: {
      fontSize: fontSize,
      color: theme.subtext,
      fontFamily,
      marginTop: 10,
      lineHeight: fontSize * 1.6,
    },
    heroBadge: {
      alignSelf: 'flex-start',
      marginBottom: 10,
      backgroundColor: theme.primary + '22',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    heroBadgeText: { fontSize: fontSize - 2, color: theme.primary, fontWeight: '700', fontFamily },
    quickLinks: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    linkCard: {
      flex: 1,
      minWidth: '44%',
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    linkIcon: { fontSize: 22, marginBottom: 8 },
    linkTitle: { fontSize: fontSize, fontWeight: '700', color: theme.text, fontFamily },
    linkSub: { fontSize: fontSize - 2, color: theme.subtext, fontFamily, marginTop: 2 },
    sectionLabel: {
      fontSize: fontSize - 1,
      fontWeight: '700',
      color: theme.primary,
      fontFamily,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 12,
    },
  });

  const LINKS = [
    { icon: '🧩', title: 'Components', sub: 'Full component showcase', screen: 'Components' },
    { icon: '🎨', title: 'Theme', sub: 'Customize colors & fonts', screen: 'Theme' },
  ];

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.inner}>
        <View style={s.hero}>
          <View style={s.heroBadge}>
            <Text style={s.heroBadgeText}>React Native · v1.0</Text>
          </View>
          <Text style={s.heroTitle}>
            Component<Text style={s.heroAccent}>Vault</Text>
          </Text>
          <Text style={s.heroSub}>
            A beginner-friendly UI component library with theme customization, built in React Native.
          </Text>
        </View>

        <Text style={s.sectionLabel}>Quick Access</Text>
        <View style={s.quickLinks}>
          {LINKS.map(link => (
            <TouchableOpacity
              key={link.screen}
              style={s.linkCard}
              onPress={() => onNavigate(link.screen)}
              activeOpacity={0.8}
            >
              <Text style={s.linkIcon}>{link.icon}</Text>
              <Text style={s.linkTitle}>{link.title}</Text>
              <Text style={s.linkSub}>{link.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
