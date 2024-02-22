import { jwtDecode } from 'jwt-decode'
import useWallet from './useWallet'
import { create } from 'zustand';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { useEffect } from 'react';
import { setContext } from '@apollo/client/link/context';

interface AuthStore {
  gqlToken: string | undefined;
  isLoading: boolean;
  address: string;
  isAuthorized: boolean;
  setGqlToken: (token: string | undefined) => void;
  setIsLoading: (loading: boolean) => void;
  setAddress: (address: string) => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const authStore = create<AuthStore>((set, get) => ({
  gqlToken: undefined,
  isLoading: true,
  address: "",
  isAuthorized: false,
  setGqlToken: (token: string | undefined) => {
    set(state => ({ ...state, gqlToken: token }))
  },
  setIsLoading: (loading: boolean) => {
    set(state => ({ ...state, isLoading: loading }))
  },
  setAddress: (address: string) => {
    set(state => ({ ...state, address }))
  },
  setIsAuthorized: (isAuthorized: boolean) => {
    set(state => ({ ...state, isAuthorized }))
  }
}));


const useAuth = () => {

  const { connectWallet, signMessage } = useWallet();
  const { gqlToken, setGqlToken, setIsLoading, setAddress, setIsAuthorized } = authStore();

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SWITCHBOARD_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    console.log(gqlToken);
    return {
      headers: {
        ...headers,
        authorization: gqlToken ? `Bearer ${gqlToken}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const checkAuthValidity = async () => {
    try {
      const { data, error } = await client.query({
        query: gql`
            query {
              system {
                auth {
                  me {
                    address
                  }
                }
              }
            }
        `,
      });

      setAddress(data.system.auth.me.address);
    } finally {
      setIsLoading(false);
    }

  };

  const createChallenge = async (address: string) => {
    const { data, errors } = await client.mutate({ mutation: gql`mutation { createChallenge(address: "${address}") { nonce, message } }` });

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data.createChallenge;
  };

  const solveChallenge = async (nonce: string, signature: string) => {
    const { data, errors } = await client.mutate({ mutation: gql`mutation { solveChallenge(nonce: "${nonce}", signature: "${signature}") { token } }` });

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data.solveChallenge.token;
  };

  const createSession = async (name: string, expiryDurationSeconds: number | null, allowedOrigins: string) => {
    const { data, errors } = await client.mutate({ mutation: gql`mutation { createSession(name: "${name}", expiryDurationSeconds: ${expiryDurationSeconds}, allowedOrigins: "${allowedOrigins}") { token } }` });

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data.createSession.token;
  }

  const revokeSession = async (sessionId: string) => {
    const { data, errors } = await client.mutate({ mutation: gql`mutation { revokeSession(sessionId: "${sessionId}") { id } }` });

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (gqlToken) {
      const payload = jwtDecode(gqlToken) as { sessionId?: string } | undefined
      if (sessionId === payload?.sessionId) {
        setGqlToken(undefined);
        setIsAuthorized(false);
      }
    }

    return data.value?.revokeSession?.referenceTokenId
  }



  const signIn = async () => {

    const address = await connectWallet()

    const { nonce, message } = await createChallenge(address)
    const signature = await signMessage(message)

    const token = await solveChallenge(nonce, signature)
    setGqlToken(token)
    setIsAuthorized(true)
  }


  const signOut = async () => {
    if (!gqlToken) {
      throw new Error('No user token provided')
    }
    const payload = jwtDecode(gqlToken) as { sessionId?: string } | undefined
    if (!payload || !payload.sessionId) {
      throw new Error('Token has invalid format')
    }
    await revokeSession(payload.sessionId)
  }

  return { checkAuthValidity, signIn, signOut, createSession, revokeSession }
}

export default useAuth