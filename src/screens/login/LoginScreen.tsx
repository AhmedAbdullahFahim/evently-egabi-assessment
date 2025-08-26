import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getUser } from '../../shared/storage/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { User } from '../profile/types';
import Input from '../../common/components/Input';
import Button from '../../common/components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    const storedUser: User | null = await getUser();
    console.log('stored user', storedUser);

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.phone === phone
    ) {
      navigation.replace('Profile');
    } else {
      Alert.alert('Login Failed', 'Invalid username or phone number');
    }
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
      <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
