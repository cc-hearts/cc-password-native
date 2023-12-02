import React from 'react';
import {Routes, Route} from 'react-router-native';
import {Text} from 'react-native';
import Provider from '../provider/provider';
import Login from '../pages/login';
import Password from '../pages/password';

export function Routers() {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Provider />}>
          <Route path="/password" element={<Password />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}
