import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext.jsx';
import Header from './src/components/Header.jsx';
import Footer from './src/components/Footer.jsx';
import Home from './src/screens/Home.jsx';
import ComponentLibrary from './src/screens/ComponentLibrary.jsx';
import ThemeSettings from './src/screens/ThemeSettings.jsx';
import About from './src/screens/About.jsx';

const SCREENS = {
  Home: Home,
  Components: ComponentLibrary,
  Theme: ThemeSettings,
  About: About,
};

const AppContent = () => {
  const [activeScreen, setActiveScreen] = useState('Home');
  const ActiveComponent = SCREENS[activeScreen] || Home;

  return (
    <View style={styles.root}>
      <Header activeScreen={activeScreen} onNavigate={setActiveScreen} />
      <View style={styles.body}>
        <ActiveComponent onNavigate={setActiveScreen} />
      </View>
      <Footer />
    </View>
  );
};

const App = () => (
  <ThemeProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f1117' }}>
      <AppContent />
    </SafeAreaView>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

export default App;
