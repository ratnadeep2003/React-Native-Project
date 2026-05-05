import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext.jsx';

const NAV_LINKS = ['Home', 'Components', 'Theme', 'About'];

const Header = ({ activeScreen, onNavigate }) => {
  const { theme, fontFamily, fontSize } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingTop: 44,
      paddingHorizontal: 20,
      paddingBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
      zIndex: 100,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: fontSize + 4,
      fontWeight: '700',
      color: theme.primary,
      fontFamily,
      letterSpacing: 0.5,
    },
    logoAccent: {
      color: theme.accent,
    },
    hamburger: {
      padding: 6,
      gap: 4,
    },
    bar: {
      width: 22,
      height: 2.5,
      backgroundColor: theme.text,
      borderRadius: 2,
      marginVertical: 2,
    },
    barMiddle: {
      opacity: menuOpen ? 0 : 1,
    },
    dropdown: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 10,
    },
    navItem: {
      paddingVertical: 10,
      paddingHorizontal: 4,
    },
    navText: {
      fontSize: fontSize,
      fontFamily,
      color: theme.subtext,
      fontWeight: '500',
    },
    navTextActive: {
      color: theme.primary,
      fontWeight: '700',
    },
    activeDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.primary,
      marginLeft: 6,
    },
    navRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.logo}>
          Component<Text style={styles.logoAccent}>Vault</Text>
        </Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.hamburger} activeOpacity={0.7}>
          <View style={styles.bar} />
          <View style={[styles.bar, styles.barMiddle]} />
          <View style={styles.bar} />
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.dropdown}>
          {NAV_LINKS.map(link => (
            <TouchableOpacity
              key={link}
              style={styles.navItem}
              onPress={() => {
                onNavigate(link);
                setMenuOpen(false);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.navRow}>
                <Text style={[styles.navText, activeScreen === link && styles.navTextActive]}>
                  {link}
                </Text>
                {activeScreen === link && <View style={styles.activeDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Header;
