import { Track, Artist, Album } from './SpotifyTypes';

class TrackModel {
  name: string;
  uri: string;
  href: string;
  popularity: number;
  artists: Artist[];
  album: Album;

  constructor({ name, uri, href, popularity, artists, album }: Track) {
    this.name = name;
    this.uri = uri;
    this.href = href;
    this.popularity = popularity;
    this.artists = artists;
    this.album = album;
  }
}

export default TrackModel;
