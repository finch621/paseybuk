import { gql, useMutation } from '@apollo/client';
import { AuthPayload } from '@paseybuk/types/schema-graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContext {
  login: (email: string, password: string) => void;
  authPayload: AuthPayload | undefined;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextProps {
  children?: JSX.Element;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}

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

export function AuthProvider({ children }: AuthContextProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPayload, setAuthPayload] = useState({} as AuthPayload);
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const logout = async () => {
    await AsyncStorage.clear();
    setAuthPayload({} as AuthPayload);
    setIsAuthenticated(false);
  };

  const login = (email: string, password: string) => {
    loginMutation({ variables: { email, password } });
  };

  if (error) {
    alert(error.message);
    console.error(error);
  }

  useEffect(() => {
    (async () => {
      if (data && data.login) {
        const { token, user }: AuthPayload = data.login;
        setAuthPayload({ token, user });
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
      }

      return logout;
    })();
  }, [data, error]);

  const value: AuthContext = {
    login,
    logout,
    authPayload,
    isAuthenticated,
    isLoading: loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
