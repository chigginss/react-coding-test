import UserAlbums from './UserAlbums';
import './App.css';


const App = () => {

  return (
    <div className="content">
      <h1 className="header">Albums</h1>
      <h4 className="header">Click the album's title to view it's cover. </h4>
      <h4 className="header">Click the thumbnail to view full-size </h4>
      <UserAlbums />
    </div>
  );
}

export default App;
