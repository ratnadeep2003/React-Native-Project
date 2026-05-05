import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext.jsx';

const About = () => {
  const { theme, fontFamily, fontSize } = useTheme();

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 24, paddingBottom: 40 },
    card: {
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 14,
    },
    title: { fontSize: fontSize + 2, fontWeight: '800', color: theme.text, fontFamily, marginBottom: 8 },
    body: { fontSize: fontSize - 1, color: theme.subtext, fontFamily, lineHeight: fontSize * 1.6 },
  });

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={true}>
      <View style={s.inner}>
        <View style={s.card}>
          <Text style={s.title}>About ComponentVault</Text>
          <Text style={s.body}>
            ComponentVault is a React Native component project built to demonstrate reusable UI components,
            dynamic theming and a collapsible navigation menu.
          </Text>
        </View>
        <View style={s.card}>
          <Text style={s.title}>Features</Text>
          <Text style={s.body}>
            {`• Header & Footer layout\n• Collapsing navigation menu\n• Dynamic theme system (colors, fonts, sizes)\n• Full component library showcase\n`}
          </Text>
        </View>
        <View style={s.card}>
          <Text style={s.title}>Stack</Text>
          <Text style={s.body}>
            Built with React Native core components. 
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;


