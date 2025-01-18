import {request, check} from 'react-native-permissions';
import {setPermission} from '../redux/slices/permissionSlice';

export const checkPermission = async (permission, dispatch) => {
  const status = await check(permission);
  switch (status) {
    case 'denied':
      dispatch(setPermission(false));
      break;
    case 'blocked':
      dispatch(setPermission(false));
      break;
    case 'granted':
      dispatch(setPermission(true));
      break;
    default:
      dispatch(setPermission(false));
      break;
  }
};

export const requestPermission = async (permission, dispatch) => {
  const status = await request(permission);
  switch (status) {
    case 'denied':
      dispatch(setPermission(false));
      break;
    case 'blocked':
      dispatch(setPermission(false));
      break;
    case 'granted':
      dispatch(setPermission(true));
      break;
    default:
      dispatch(setPermission(false));
      break;
  }
};
