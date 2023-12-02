import {noop} from '@cc-heart/utils';
import {fn} from '@cc-heart/utils/helper';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useLocation, useNavigate} from 'react-router-native';
import {Profile, getProfile} from '../features/login/apis';
import {getToken, removeRefreshToken, removeToken} from '../utils/storage';

export const AuthContext = React.createContext<{
  profile: Profile | null;
  logout: fn;
}>({
  profile: null,
  logout: noop,
});

export function AuthProvider(props: React.PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<Profile | null>(null);

  useEffect(() => {
    if (!profile?.username) {
      getToken()
        .then(token => {
          if (token) {
            // get Profile
            return getProfile().then(profile => {
              if (profile) {
                setProfile(profile);
              }
            });
          }
          return Promise.reject('[auth provider] get token result:' + token);
        })
        .catch(error => {
          console.log('[auth provider] getToken error: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [profile?.username]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.pathname === '/') {
      navigate(profile === null ? '/login' : '/password', {replace: true});
    }
  }, [isLoading, profile, navigate, location.pathname]);

  function logout() {
    Promise.all([removeToken(), removeRefreshToken()]).then(() => {
      setProfile(null);
      navigate('/login', {replace: true});
    });
  }

  if (isLoading) {
    return <Text>Loading....</Text>;
  }
  console.log('[auth provider render] success');
  return <AuthContext.Provider value={{profile, logout}} {...props} />;
}
