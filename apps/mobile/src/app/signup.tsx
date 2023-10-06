import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, Stack } from 'expo-router';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { gql, useMutation } from '@apollo/client';
import { CreateUserDto } from '@paseybuk/types/schema-graphql';

const SIGNUP_MUTATION = gql`
  mutation SignUp($createUserDto: CreateUserDto!) {
    createUser(createUserDto: $createUserDto) {
      id
      email
    }
  }
`;

const SignUp = () => {
  const [emailInput, onChangeEmail] = useState('');
  const [passwordInput, onChangePassword] = useState('');

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const createUserDto: CreateUserDto = {
    email: emailInput,
    password: passwordInput,
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          title: '',
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
      </View>
      <View style={styles.formContainer}>
        <Button
          style={styles.formElements}
          label="Signup"
          underlayColor="#3838ff"
          onPress={() => signUp({ variables: { createUserDto } })}
        ></Button>
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

export default SignUp;
