import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  type?: 'primary' | 'secondary';
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  loading = false,
  type = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, type === 'secondary' && styles.secondary]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[styles.text, type === 'secondary' && styles.secondaryText]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  secondary: {
    backgroundColor: '#e9ecef',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryText: {
    color: '#333',
  },
});

export default Button;
