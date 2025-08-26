import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, I18nManager, StyleSheet, Text, View } from 'react-native';
import RNRestart from 'react-native-restart';
import Button from '../../common/components/Button';
import i18n from '../../common/utils/i18n';
import { RootStackParamList } from '../../navigation';
import { getUser, logoutUser } from '../../shared/storage/user';
import { User } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState(i18n.language);

  const loadUser = async () => {
    const u = await getUser();
    setUser(u);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUser);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const toggleLang = async () => {
    const next = lang === 'en' ? 'ar' : 'en';
    await i18n.changeLanguage(next);
    setLang(next);

    const isRTL = next === 'ar';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);

      Alert.alert(
        'Restart Required',
        'The app will restart to apply language changes.',
        [
          {
            text: 'OK',
            onPress: () => {
              RNRestart.Restart();
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.label}>
            Username: <Text style={styles.value}>{user.username}</Text>
          </Text>
          <Text style={styles.label}>
            Phone: <Text style={styles.value}>{user.phone}</Text>
          </Text>

          <View style={styles.actions}>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.emptyContainer}>
            <Text style={styles.emoji}>👤</Text>
            <Text style={styles.title}>No account found</Text>
            <Text style={styles.subtitle}>
              Please log in or sign up to view your profile details.
            </Text>
          </View>
          <View style={styles.actions}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
            <View style={{ height: 12 }} />
            <Button
              title="Sign Up"
              type="secondary"
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </>
      )}

      {/* Locale Toggle */}
      <View style={{ marginTop: 20 }}>
        <Button
          title={`Toggle Language (current: ${lang})`}
          onPress={toggleLang}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  value: { fontWeight: '400', color: '#333' },
  actions: { marginTop: 20 },
  emptyContainer: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProfileScreen;
