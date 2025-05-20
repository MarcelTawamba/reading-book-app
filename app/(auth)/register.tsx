import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

// themed components
import Spacer from '../../components/Spacer';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';

// hooks
import { useUser } from '../../hooks/useUser';

// constants
import { Colors } from '../../constants/Colors';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { register } = useUser();
  
  const handleSubmit = async () => {
    setError(null);
    try {
      await register(email, password);
    } catch(error: any) {
      setError(error.message);
    }
  };
  // TouchableWithoutFeedback: allows us to click anywhere 
  // in the screen/page to close/dismiss the keyboard
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Create Your Account
        </ThemedText>

        <ThemedTextInput 
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <ThemedTextInput 
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: '#f2f2f2' }}>Register</Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100}/>
        <Link href='/login'>
          <ThemedText style={{ textAlign: 'center' }}>Login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30
  },
    error: {
      color: Colors.warning,
      padding: 10,
      backgroundColor: '#f5c1c8',
      borderColor: Colors.warning,
      borderWidth: 1,
      borderRadius: 6,
      marginHorizontal: 10
    }
});