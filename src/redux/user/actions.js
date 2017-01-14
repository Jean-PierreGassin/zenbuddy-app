/**
 * User Actions
 *
 */
import iCloudStorage from 'react-native-icloudstore';

/**
  * Update My User Data
  * - Receives complete user data in return
  */
export function updateMe(userData) {
  return dispatch =>  {
    dispatch({
      type: 'USER_REPLACE',
      data: userData,
    });

    iCloudStorage.setItem('user', JSON.stringify(userData));

    return userData;
  };
}
