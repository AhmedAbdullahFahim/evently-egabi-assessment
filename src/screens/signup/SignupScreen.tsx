import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import { saveUser } from '../../shared/storage/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { User } from '../profile/types';
import Input from '../../common/components/Input';
import Button from '../../common/components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    if (!username || !phone) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newUser: User = { username, phone, loggedIn: true };
    await saveUser(newUser);
    navigation.replace('Profile');
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Create Account" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  label: { fontSize: 16, marginBottom: 6 },
  picker: { marginBottom: 16 },
});

export default SignupScreen;
