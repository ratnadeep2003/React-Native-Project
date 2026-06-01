import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext.jsx';

// ─── helpers ────────────────────────────────────────────────
const USERS_KEY = 'cv_users';

const getUsers = async () => {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
};

const saveUser = async (email, name, password) => {
  const users = await getUsers();
  if (users[email]) return { success: false, error: 'Account already exists. Please log in.' };
  users[email] = { name, password };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

const verifyUser = async (email, password) => {
  const users = await getUsers();
  if (!users[email]) return { success: false, error: 'No account found. Please sign up first.' };
  if (users[email].password !== password) return { success: false, error: 'Incorrect password.' };
  return { success: true };
};

// ─── LoginScreen ─────────────────────────────────────────────
export const LoginScreen = ({ onLogin, onNavigateToSignup }) => {
  const { theme, fontFamily, fontSize } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    const result = await verifyUser(email.toLowerCase().trim(), password);
    if (result.success) { setError(''); onLogin(); }
    else setError(result.error);
  };

  const styles = createStyles(theme, fontFamily, fontSize);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to access your ComponentVault</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} placeholder="example@vault.com" placeholderTextColor={theme.subtext}
            value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={theme.subtext}
            value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onNavigateToSignup}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── SignupScreen ─────────────────────────────────────────────
export const SignupScreen = ({ onSignup, onNavigateToLogin }) => {
  const { theme, fontFamily, fontSize } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
    const result = await saveUser(email.toLowerCase().trim(), name, password);
    if (result.success) { setError(''); onSignup(); }
    else setError(result.error);
  };

  const styles = createStyles(theme, fontFamily, fontSize);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Get started with your custom component vault</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor={theme.subtext}
            value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} placeholder="example@vault.com" placeholderTextColor={theme.subtext}
            value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={theme.subtext}
            value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={handleSignup} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── styles (unchanged) ──────────────────────────────────────
const createStyles = (theme, fontFamily, fontSize) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background || '#0f1117' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  title: { fontSize: fontSize + 12, fontWeight: '700', color: theme.text, fontFamily, marginBottom: 8 },
  subtitle: { fontSize: fontSize, color: theme.subtext, fontFamily, marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: fontSize - 2, fontWeight: '600', color: theme.text, fontFamily, marginBottom: 8 },
  input: {
    backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 16, paddingVertical: 12, fontSize: fontSize, color: theme.text, fontFamily,
  },
  primaryButton: {
    backgroundColor: theme.primary, paddingVertical: 14, borderRadius: 8, alignItems: 'center',
    marginTop: 10, shadowColor: theme.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 5, elevation: 3,
  },
  buttonText: { color: '#ffffff', fontSize: fontSize, fontWeight: '700', fontFamily },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: fontSize - 1, color: theme.subtext, fontFamily },
  footerLink: { fontSize: fontSize - 1, fontWeight: '700', color: theme.primary, fontFamily },
  errorText: { fontSize: fontSize - 2, color: '#e74c3c', marginBottom: 10, textAlign: 'center' },
});