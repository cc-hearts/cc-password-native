import React from 'react';
import {Routes, Route} from 'react-router-native';
import {Text} from 'react-native';
import Provider from '../provider/provider';
const LoginLazy = React.lazy(() => import('../pages/login'));
const PasswordLazy = React.lazy(() => import('../pages/password'));

export function Routers() {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Routes>
        <Route path="/" element={<Provider />}>
          <Route path="/login" element={<LoginLazy />} />
          <Route path="/password" element={<PasswordLazy />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}
