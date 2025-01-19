import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {createPlaylists} from '../redux/slices/playlist.slice';

import TopColor from '../components/common/TopColor';
import MiddleColor from '../components/common/MiddleColor';
import BottomColor from '../components/common/BottomColor';

import SongCard from '../components/SongCard';
import BackButton from '../components/common/BackButton';
import {Icons} from '../utils/constants.utils';

const CreatePlaylist = ({navigation}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [playlist, setPlaylist] = useState({
    cover: '',
    name: '',
    songs: [],
  });
  const [playlistImage, setPlaylistImage] = useState(null);
  const [playlistName, setPlaylistName] = useState('');

  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const {songs} = useSelector(state => state.songs);

  const selectAllSongs = () => {
    setSelectedSongs(songs);
    setIsAllSelected(true);
  };

  const unselectAllSongs = () => {
    setSelectedSongs([]);
    setIsAllSelected(false);
  };

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('Error:', response.errorMessage);
        } else {
          const uri = response.assets[0].uri; // Path to the selected image
          setPlaylistImage(uri);
        }
      },
    );
  };

  const handleSubmit = () => {
    if (!playlistName || !playlistImage) {
      alert('Please provide a playlist name and cover image');
      return;
    }

    if (selectedSongs.length === 0) {
      alert('Please provide a playlist name and cover image');
      return;
    }

    const newPlaylist = {
      name: playlistName,
      cover: playlistImage,
      songs: selectedSongs,
    };

    dispatch(createPlaylists(newPlaylist));

    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : '#FFFFFF'},
      ]}>
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text
            style={[
              styles.headerTitle,
              {color: isDarkMode ? '#FFFFFF' : '#191724'},
            ]}>
            Create Playlist
          </Text>
          <View style={{width: 24}}>
            <Text>{/* Empty text for alignment */}</Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {/* Image Upload Section */}
          <TouchableOpacity
            onPress={handlePickImage}
            style={[
              styles.imageUploadContainer,
              {
                backgroundColor: isDarkMode ? '#2A2838' : '#F5F5F5',
                borderColor: isDarkMode ? '#7B57E4' : '#4527A0',
                borderWidth: playlistImage ? 0 : 1,
              },
            ]}>
            {playlistImage ? (
              <View style={styles.imgContainer}>
                <Image
                  source={{uri: playlistImage}}
                  style={styles.uploadedImage}
                />
                <Image
                  source={{uri: playlistImage}}
                  style={styles.uploadedImgShadow}
                />
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                {Icons.MaterialIcons.imgAdd(
                  40,
                  isDarkMode ? '#7B57E4' : '#4527A0',
                )}
                <Text
                  style={[
                    styles.uploadText,
                    {color: isDarkMode ? '#FFFFFF' : '#191724'},
                  ]}>
                  Choose Playlist Cover
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Title Input */}
          <View style={styles.inputSection}>
            <Text
              style={[
                styles.inputLabel,
                {color: isDarkMode ? '#FFFFFF' : '#191724'},
              ]}>
              Playlist Name
            </Text>
            <TextInput
              value={playlistName}
              onChangeText={text => setPlaylistName(text)}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#2A2838' : '#F5F5F5',
                  color: isDarkMode ? '#FFFFFF' : '#191724',
                  borderColor: isDarkMode ? '#7B57E4' : '#4527A0',
                },
              ]}
              placeholder="Enter playlist name"
              placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
            />
          </View>

          <View style={styles.songsHeaderContainer}>
            <Text
              style={[
                styles.songsHeading,
                {color: isDarkMode ? '#FFFFFF' : 'black'},
              ]}>
              Songs
            </Text>

            <TouchableOpacity
              onPress={isAllSelected ? unselectAllSongs : selectAllSongs}>
              <Text
                style={[
                  styles.selectAllText,
                  {color: isDarkMode ? '#7B57E4' : '#4527A0'},
                ]}>
                {isAllSelected ? 'Unselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Songs List */}
          <View style={styles.songsContainer}>
            {songs.map((song, index) => (
              <SongCard
                key={index}
                song={song}
                isDisable={true}
                isRadioButton={true}
                selectedSongs={selectedSongs}
                setSelectedSongs={setSelectedSongs}
              />
            ))}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.createButton,
              {backgroundColor: isDarkMode ? '#7B57E4' : '#4527A0'},
            ]}>
            <Text style={styles.createButtonText}>Create Playlist</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TopColor
        additionalStyles={{left: '0%', transform: 'translate(-0%, -0%)'}}
      />
      <MiddleColor />
      <BottomColor
        additionalStyles={{left: '100%', transform: 'translate(-100%, -0%)'}}
      />
    </View>
  );
};

export default CreatePlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 87, 228, 0.1)',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },

  content: {
    flex: 1,
    zIndex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
  },

  imageUploadContainer: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 20,
  },

  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },

  imgContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  uploadedImage: {
    zIndex: 1,
    borderRadius: 20,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  uploadedImgShadow: {
    zIndex: 0,
    position: 'absolute',
    top: '120%',
    left: '50%',
    transform: `translate(-50%, -120%)`,
    width: '95%',
    height: '95%',
    borderRadius: 20,
    filter: 'blur(10px)',
  },

  inputSection: {
    marginTop: 25,
    gap: 8,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginLeft: 4,
  },

  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter',
    borderWidth: 1,
  },

  songsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  songsHeading: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 'bold',
  },

  selectAllText: {
    fontFamily: 'Inter',
    fontSize: 12,
  },

  songsContainer: {
    marginTop: 15,
    gap: 12,
    marginBottom: 15,
  },

  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(123, 87, 228, 0.1)',
    zIndex: 1,
  },

  createButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
