import {useState} from 'react';
import './App.css';


const UserAlbums = (props) => {
  const {title, thumbnailUrl, photoUrl, number} = props;
  const [shouldShowAlbum, setShowAlbum] = useState(false);
  const capsTitle = number + '. ' + title.slice(0, 1).toUpperCase() + title.slice(1);

  return (
    <div>
      <div className='album' role='button' onClick={() => setShowAlbum(!shouldShowAlbum)}>
        {capsTitle}
      </div>
      <div style={{'display': shouldShowAlbum ? 'grid' : 'none', 'justify-content': 'center'}}>
        <a href={photoUrl} target='_blank'>
          <img src={thumbnailUrl}></img>
        </a>
      </div>
    </div>
  );
}

export default UserAlbums;
