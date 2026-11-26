
import React, { useEffect, useState } from 'react';

import { PaperProvider } from 'react-native-paper';

import { SafeAreaProvider } from
  'react-native-safe-area-context';

import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from './scr/services/firebase';

import AppNavigator from './scr/navigation/AppNavigator';

import SplashScreen from './scr/screens/SplashScreen';

function App() {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);

      }
    );

    return unsubscribe;

  }, []);

  return (

    <SafeAreaProvider>

      <PaperProvider>

        {loading ? (

          <SplashScreen />

        ) : (

          <AppNavigator user={user} />

        )}

      </PaperProvider>

    </SafeAreaProvider>

  );

}

export default App;
