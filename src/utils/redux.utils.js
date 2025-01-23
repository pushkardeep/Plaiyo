import {setIsPlaylist, setPlaylistId} from '../redux/slices/player.slice';

// for setting some states in redux that which plalist is playing or not playing
export const setPlaylistReduxStates = (bool, id, dispatch) => {
  dispatch(setIsPlaylist(bool));
  dispatch(setPlaylistId(id));
};
