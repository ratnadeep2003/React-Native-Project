import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext.jsx';
import Header from './src/components/Header.jsx';
import Footer from './src/components/Footer.jsx';
import Home from './src/screens/Home.jsx';
import ComponentLibrary from './src/screens/ComponentLibrary.jsx';
import ThemeSettings from './src/screens/ThemeSettings.jsx';
import About from './src/screens/About.jsx';

// Import our new authentication components
import { LoginScreen, SignupScreen } from './src/screens/AuthScreens.jsx';

const SCREENS = {
  Home: Home,
  Components: ComponentLibrary,
  Theme: ThemeSettings,
  About: About,
};

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('Login'); // Tracks 'Login' or 'Signup'
  const [activeScreen, setActiveScreen] = useState('Home');

  const ActiveComponent = SCREENS[activeScreen] || Home;

  // 1. If the user is NOT authenticated, display our login/signup routing block
  if (!isAuthenticated) {
    if (authScreen === 'Signup') {
      return (
        <SignupScreen 
          onSignup={() => setIsAuthenticated(true)} 
          onNavigateToLogin={() => setAuthScreen('Login')} 
        />
      );
    }
    return (
      <LoginScreen 
        onLogin={() => setIsAuthenticated(true)} 
        onNavigateToSignup={() => setAuthScreen('Signup')} 
      />
    );
  }

  // 2. If user IS authenticated, display the main application view layout
  return (
    <View style={styles.root}>
      {/* Pass the onLogout handler down here */}
      <Header 
        activeScreen={activeScreen} 
        onNavigate={setActiveScreen} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      <View style={styles.body}>
        <ActiveComponent onNavigate={setActiveScreen} />
      </View>
      <Footer />
    </View>
  );
};

const App = () => (
  <ThemeProvider>
    {/* Setting flex: 1 ensures our login layout stretches edge-to-edge properly */}
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