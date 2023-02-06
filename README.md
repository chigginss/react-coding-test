Users and Albums

### My Approach 
I chose to use React for convience, and because I decided to deploy my app using Vercel. I used ```npx create-react-app``` and then added two new components - ```UserAlbums.js``` and ```Album.js```. ```UserAlbums``` is where the fetching of the json occurs, the cleaning and then passing it down via props to Album to render. 

### Fetching Data
I used ```Promise.all``` (map on the array of URLs), and ```async/await``` to fetch the JSON. 

The data is loaded in the ```useEffect``` hook so we can get it before the componenet is rendered. I also made use of useCallback, so I could use the dependency array. Additionally, I used useState to store the ```<li>``` elements that I created in the ```getUserAlbumElements``` function. I did this to avoid iterating through users an additional time. 

Once the data was loaded, I noticed there were a lot of additional values (particularly in the user obj) that we didn't need. Because the prompt mentioned "Only information that will be presented should be loaded.", I tried to clean up the data immediately. I did this by creating two helper functions to pull all of the albums for a giver userid, and all of the photo urls for a given album. Then I combined this data and passed it into a child component to render.

- Iterate through all of the users 
- Retrieve the relevant albums for the given user
- For each album, get the relevant photos 

In my opinon, this pattern is not ideal - there are multiple and nested iterations which could get dangerous as the application scales. Unfortunately, I think it's necessary with the way the data is currently organized. To improve this, I'm wondering if there is a way to reorgainze our data. In particular, the photo urls could be directly saved to the album object - because as it is now, the photo obj and album obj have overlap (albumId, title). Additionally, if we could create an indexed query for retrieving all the albums associated with a given user, that would improve performance. 

I decided to display the list of albums in a grid, with the user's name as the 'title' of the grid. I wasn't sure if the user in this case was the composer, or simply these albums were favorited or suggested by the user. Without that context, I diecided it would be best to display the user's name and then group the albums below.

### Displaying the Images
I decided to use a toggle, so that clicking the title will display/hide the thumbnail accordingly. I used onClick to update the state of the thumbnail. Then, depending on the state I used a ternerary operator to set the 'display' value.

For showing the fullsize image, I made the decision to open the image in a new tab. However, I wasn't if you wanted me to rerender the image when the state is updated during onClick. So I did it both ways (but kept the new page experience in my final code). I included a video of the experience if the element was rerendered with the new url, and the code below: 

```
const Album = (props) => {
  const {title, thumbnailUrl, photoUrl} = props;
  const [shouldShowAlbum, setShowAlbum] = useState(false);
  const [clickedPhotoUrl, setPhotoUrl] = useState(thumbnailUrl);

  return (
    <div>
      <div onClick={() => setShowAlbum(!shouldShowAlbum)}>{title}</div>
      <div className='album' onClick={() => setPhotoUrl(photoUrl)} style={{'display': shouldShowAlbum ? 'flex' : 'none'}}>
        <img src={clickedPhotoUrl}></img>
      </div>
    </div>
  );
}

export default Album;
```

https://user-images.githubusercontent.com/18056847/216854439-f9661e7d-4d6a-450f-8102-32a0db3bb15c.mov


### Styling 
For styling, I used CSS Grid and just extremely simple styling. I wanted things to look clean and orginized, but I didn't want to spend too much time on it. It's not the best design, but I'm hopeful that it's adequate enough for now.

### Next Steps
If I had more time, I would have spent more time on the grid itself, improving the UI, making things responsive, improve the spacing / displaying of the album covers, improve a11y, and fix the issues with data / scale that I mentioned above. 
