import './App.css';
import Album from './Album';
import {useEffect, useState, useCallback} from 'react';


const UserAlbums = () => {
    const [userAlbumElements, setUsersAlbumsAndThumbnailsElements] = useState();

    const getAlbumsFromUserId = (userId, albums) => {
      const userAlbums = [];
      albums.forEach(album => {
        if (album.userId === userId) {
          userAlbums.push(album);
        }
      });
      return userAlbums;
    }
  
    const getPhotoUrlsFromAlbumId = (albumId, photos) => {
      let url;
      let thumbnailUrl;
      photos.forEach(photo => {
        if (albumId === photo.albumId) {
          url = photo.url;
          thumbnailUrl = photo.thumbnailUrl;
        }
      });
      return {url, thumbnailUrl};
    }

    const getData = useCallback(async () => {
        const urls = [
        'https://jsonplaceholder.typicode.com/albums',
        'https://jsonplaceholder.typicode.com/users',
        'https://jsonplaceholder.typicode.com/photos'
        ];

        const data = await Promise.all(urls.map(async url => {
        const resp = await fetch(url);
          return resp.json();
        }));
        const [albums, users, photos] = data;

        const userAlbumElements = users.map(user => {
          let photoUrls;
          const userAlbums = getAlbumsFromUserId(user.id, albums);
          const userAlbumsAndThumbnails = userAlbums.map(album => {
            photoUrls = getPhotoUrlsFromAlbumId(album.id, photos)

            return {
              'id': album.id,
              'title': album.title,
              'thumbnailUrl': photoUrls.thumbnailUrl,
              'url': photoUrls.url
            };
          });

          return (
            <li className='albumRow' key={user.id}>
              <p className='userName'>{user.name}</p>
              <div className='userAlbums'>
                {userAlbumsAndThumbnails ? userAlbumsAndThumbnails.map((userAlbum, index) => 
                  <Album key={userAlbum.id}
                    number={index + 1}
                    title={userAlbum.title}
                    thumbnailUrl={userAlbum.thumbnailUrl}
                    photoUrl={userAlbum.url}
                  />
                ) : null} 
              </div>
            </li>
          );
        });

        setUsersAlbumsAndThumbnailsElements(userAlbumElements);
    }, [])

    useEffect(() => {
      getData();
    }, [getData])

  return (
    <div>
      <ul>
        {userAlbumElements}
      </ul>
    </div>
  );
}

export default UserAlbums;
