import './App.css';
import UserAlbums from './UserAlbums';
import {useEffect, useState, useCallback} from 'react';


const User = () => {

    const [photos, setPhotos] = useState();
    const [users, setUsers] = useState();
    const [albums, setAlbums] = useState();

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

        // sort all data so each object has userid, name, user's albums, relevant photo urls
        // then just pass the photo urls down, only need to use map once
        // map the new fraken object, should have name and id for li key
        const [albums, users, photos] = data;
        setPhotos(photos);
        setAlbums(albums);
        const userValues = Object.values(users);
        const userData = userValues.map(value => { return {'id': value.id, 'name': value.name}});
        setUsers(userData);
    }, [])

    useEffect(() => {
        getData();
    }, [])

  return (
    <div>
      <ul>
        {users ? users.map(user => 
          <li className='albumRow' key={user.id}>
            <h4>{user.name}</h4>
            <UserAlbums user={user} photos={photos} albums={albums} />
          </li>) : null}
      </ul>
    </div>
  );
}

export default User;
