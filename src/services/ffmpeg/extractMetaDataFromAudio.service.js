import {FFmpegKit} from 'ffmpeg-kit-react-native';

export const extractMetaDataFromAudio = async filePath => {
  try {
    const metadataSession = await FFmpegKit.execute(`-i "${filePath}"`);
    const metadataLogs = await metadataSession.getAllLogsAsString();

    const title = metadataLogs.match(/title\s*:\s*(.*)/)[1] || 'unknown';
    const artist = metadataLogs.match(/artist\s*:\s*(.*)/)[1] || 'unknown';
    const album = metadataLogs.match(/album\s*:\s*(.*)/)[1] || 'unknown';
    const duration = metadataLogs.match(/Duration\s*:\s*(.*)/)[1] || 'unknown';

    return {title, artist, album, duration};
  } catch (error) {
    console.log('Error in extracting song data', error);
    return {
      title: 'unknown',
      artist: 'unknown',
      album: 'unknown',
      duration: 'unknown',
    };
  }
};
