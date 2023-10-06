/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useMutation,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = new ApolloClient({
  uri: 'http://192.168.1.21:3000/graphql',
  cache: new InMemoryCache(),
});

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const Login = () => {
  const [emailInput, onChangeEmail] = useState('');
  const [passwordInput, onChangePassword] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    (async () => {
      try {
        if (
          data &&
          data.login &&
          (await AsyncStorage.getItem('token')) !== data.login.token
        ) {
          await AsyncStorage.setItem('token', data.login.token);
          await AsyncStorage.setItem('user', JSON.stringify(data.login.user));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [data]);

  if (data && data.login) {
    return alert(`${data.login.user.id} logged in`);
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text>Something a logo here</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            inputMode="email"
            style={styles.formElements}
            placeholder="Email"
            value={emailInput}
            onChangeText={onChangeEmail}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.formElements}
            placeholder="Password"
            value={passwordInput}
            onChangeText={onChangePassword}
          />
          <TouchableHighlight
            style={[
              styles.formElements,
              {
                backgroundColor: 'blue',
                justifyContent: 'center',
                borderRadius: 50,
              },
            ]}
            underlayColor="#3838ff"
            onPress={() => {
              login({
                variables: { email: emailInput, password: passwordInput },
              });
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
            )}
          </TouchableHighlight>
        </View>
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <TouchableHighlight
            style={[
              styles.formElements,
              {
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#fff',
              },
            ]}
            underlayColor="#f2f2f2"
            onPress={() => alert('test')}
          >
            <Text style={{ color: 'blue', textAlign: 'center' }}>Signup</Text>
          </TouchableHighlight>
          <Text style={{ color: 'blue', textAlign: 'center' }}>
            PaseyBuk Ltd.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export const App = () => (
  <ApolloProvider client={client}>
    <Login />
  </ApolloProvider>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  formElements: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'blue',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
});

export default App;
