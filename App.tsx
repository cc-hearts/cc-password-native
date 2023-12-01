/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-get-random-values';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeRouter} from 'react-router-native';
import {Routers} from './src/routers/routers';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NativeRouter>
        <Routers />
      </NativeRouter>
    </SafeAreaView>
  );
}

export default App;
