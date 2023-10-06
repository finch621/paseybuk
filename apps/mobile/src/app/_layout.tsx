import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../providers/AuthProvider';
import { StatusBar } from 'react-native';

const client = new ApolloClient({
  uri: 'http://192.168.1.21:3000/graphql',
  cache: new InMemoryCache(),
});

const Layout = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <>
          <StatusBar barStyle="default" />
          <Stack />
        </>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default Layout;
