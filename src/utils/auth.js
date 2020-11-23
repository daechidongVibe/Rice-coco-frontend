import * as Google from 'expo-google-app-auth';
import getEnvVars from '../../environment.js';

const { REACT_NATIVE_ANDROID_CLIENT_ID, REACT_NATIVE_IOS_CLIENT_ID } = getEnvVars();

const googleAuth = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: REACT_NATIVE_ANDROID_CLIENT_ID,
      iosClientId: REACT_NATIVE_IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const { user: { email } } = result;

      return email;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default googleAuth;
