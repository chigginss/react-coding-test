import {useEffect, useState} from 'react';
import UserAlbum from './UserAlbum';
import './App.css';


const UserAlbums = (props) => {
  const {user, photos, albums} = props;
  const [userAlbums, setUserAlbums] = useState([]);

  const getAlbumsByUserId = () => {
    const userAlbums = [];
    albums.forEach(album => {
      if (album.userId === user.id) {
        userAlbums.push(album);
      }
    });
    console.log('user albums', userAlbums)
    setUserAlbums(userAlbums)
  }

  const getPhotoThumbnailUrlFromAlbumId = (albumId) => {
    let photoThumbnailUrl;
    photos.forEach(photo => {
      if (albumId === photo.albumId) {
        photoThumbnailUrl = photo.thumbnailUrl;
      }
    });
    return photoThumbnailUrl;
  }

  const getPhotoUrlFromAlbumId = (albumId) => {
    let photoUrl;
    photos.forEach(photo => {
      if (albumId === photo.albumId) {
        photoUrl = photo.url;
      }
    });
    return photoUrl;
  }

  useEffect(() => {
    getAlbumsByUserId();
  }, [])

  return (
      <div className='userAlbums'>
        {userAlbums ? userAlbums.map(userAlbum => 
          <UserAlbum key={userAlbum.id}
            title={userAlbum.title}
            thumbnailUrl={getPhotoThumbnailUrlFromAlbumId(userAlbum.id)}
            photoUrl={getPhotoUrlFromAlbumId(userAlbum.id)}
           />
        ) : null} 
    </div>);
}

export default UserAlbums;
