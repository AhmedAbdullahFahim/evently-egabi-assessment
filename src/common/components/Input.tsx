import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardType,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label?: string;
  keyboardType?: KeyboardType;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const Input: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  label,
  keyboardType = 'default',
  wrapperStyle,
}) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 4, color: '#444' },
  input: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Input;
