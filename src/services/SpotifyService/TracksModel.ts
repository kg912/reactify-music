import { Track, Artist, Album } from 'types';

class TrackModel {
  id: string;
  name: string;
  uri: string;
  href: string;
  popularity: number;
  artists: Artist[];
  album: Album;

  constructor({ id, name, uri, href, popularity, artists, album }: Track) {
    this.id = id;
    this.name = name;
    this.uri = uri;
    this.href = href;
    this.popularity = popularity;
    this.artists = artists;
    this.album = album;
  }
}

export default TrackModel;
