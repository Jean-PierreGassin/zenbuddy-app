/**
 * User Actions
 *
 */
import iCloudStorage from 'react-native-icloudstore';
import { Platform, AsyncStorage } from 'react-native';

/**
  * Update My User Data
  * - Receives complete user data in return
  */
export function updateMe(userData) {
  return (dispatch) => {
    dispatch({
      type: 'USER_REPLACE',
      data: userData,
    });

    if (Platform.OS === 'ios') {
      iCloudStorage.setItem('user', JSON.stringify(userData));
    }

    if (Platform.OS === 'android') {
      AsyncStorage.setItem('user', JSON.stringify(userData));
    }

    return userData;
  };
}

export default updateMe;
