import {Outlet} from 'react-router-native';
import {AuthProvider} from './auth-provider';
import React from 'react';

function Provider(props: React.PropsWithChildren) {
  return (
    <AuthProvider {...props}>
      <Outlet />
    </AuthProvider>
  );
}

export default Provider;
