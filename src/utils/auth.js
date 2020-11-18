import * as Google from 'expo-google-app-auth';
import getEnvVars from '../../environment.js';

const { REACT_NATIVE_ANDROID_CLIENT_ID, REACT_NATIVE_IOS_CLIENT_ID } = getEnvVars();

const Auth = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: REACT_NATIVE_ANDROID_CLIENT_ID,
      iosClientId: REACT_NATIVE_IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log('로그인 성공');
      const { accessToken, user: { email } } = result;
      return {
        success: true,
        accessToken,
        email
      };
    } else {
      console.log('로그인 실패');
      return { cancelled: true };
    }
  } catch (err) {
    return { error: true };
  }
};

export default Auth;
