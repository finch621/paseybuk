import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, Stack } from 'expo-router';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useAuth } from '../providers/AuthProvider';

const Login = () => {
  const [emailInput, onChangeEmail] = useState('');
  const [passwordInput, onChangePassword] = useState('');
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <Text style={{ textAlign: 'center' }}>Something a logo here</Text>
      </View>
      <View style={styles.formContainer}>
        <FormInput
          inputMode="email"
          placeholder="Email"
          value={emailInput}
          onChangeText={onChangeEmail}
        />
        <FormInput
          style={styles.formElements}
          secureTextEntry={true}
          placeholder="Password"
          value={passwordInput}
          onChangeText={onChangePassword}
        />
        <Button
          style={styles.formElements}
          label="Login"
          underlayColor="#3838ff"
          onPress={() => {
            login(emailInput, passwordInput);
          }}
        ></Button>
      </View>
      <View style={styles.formContainer}>
        <Button
          style={{ backgroundColor: '#DADAE1' }}
          underlayColor="#f2f2f2"
          onPress={() => router.push('/signup')}
        >
          <Text style={{ color: 'blue', textAlign: 'center' }}>Signup</Text>
        </Button>
        <Text
          style={{
            color: 'blue',
            textAlign: 'center',
          }}
        >
          PaseyBuk Ltd.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    marginHorizontal: 20,
  },
  formElements: {
    marginTop: 15,
  },
});

export default Login;
