import {useState} from 'react';
import './App.css';


const UserAlbums = (props) => {
  const {title, thumbnailUrl, photoUrl} = props;
  const [shouldShowAlbum, setShowAlbum] = useState(false);

  return (
    <div onClick={() => setShowAlbum(!shouldShowAlbum)}>
      <div>{title}</div>
      <div className='album' style={{'display': shouldShowAlbum ? 'flex' : 'none'}}>
        <a href={photoUrl} target="_blank">
        <img src={thumbnailUrl}></img>
        </a>
      </div>
    </div>
  );
}

export default UserAlbums;
