Users and Albums

### My Approach 

Please visit https://react-coding-test.vercel.app/ to view, and review the code in the ```Album``` and ```UserAlbums``` components.

I chose to use React instead of React Native for convenience -- and because I decided to deploy my app using Vercel. I used ```npx create-react-app``` and then added two new components - ```UserAlbums.js``` and ```Album.js```. ```UserAlbums``` is where most of my work is.

Initially, I had every single album in a list, with the ```<li>``` element displaying the title and relevant user's name. However, I decided it would be better to group the albums by user, and then display that way instead of individually. Hopefully, this still satisfies the ask to 'Shows a list of album titles returned by jsonplaceholder.typicode.com/albums with the name of the user the album belongs to.' condition. 

### Fetching Data
I used ```Promise.all``` (map on the array of URLs), and ```async/await``` to fetch. 

The data is loaded in the ```useEffect``` hook so we can get it before the component is rendered. Additionally, I used ```useState``` to store the ```<li>``` elements that I created in the ```getUserAlbumElements``` function. I did this to avoid iterating through users an additional time. 

Once the data was loaded, I noticed there were a lot of additional values (particularly in the user obj) that we didn't need. Because the prompt mentioned "Only information that will be presented should be loaded.", I tried to clean up the data immediately, and not display or pass down any irrelevant data. I did this by extracting the only data needed from ```user```, and creating two helper functions to pull all of the albums for a giver userid, and all of the photo urls for a given album. Then I combined this data and passed it into a child component to render.

In my opinion, this pattern is not ideal - there are multiple and nested iterations which could get dangerous as the application scales. Unfortunately, I think it's necessary with the way the data is currently organized. To improve this, I'm wondering if the photo urls could be directly saved to the album object. As it is now, the photo obj and album obj have overlap (albumId, title). Additionally, if we could create an indexed query for retrieving all the albums associated with a given user, that would improve performance. 

I decided to display the list of albums in a grid, with the user's name as the 'title' of the grid. I wasn't sure if the user in this case was the composer, or simply these albums were favorited by the user. Without the context, I decided it would be best to display the user's name and then group the albums below. 

### Displaying the Images
I decided to utilize ```useState``` so the title will toggle the thumbnail accordingly, when clicked. I used ```onClick``` to update the state of the thumbnail. Then, depending on the state I used a ternary operator to set the 'display' value.

For showing the full-size image, I made the decision to open the image in a new tab. However, I wasn't sure if I should re-render the image when the state is updated during onClick instead. So I did it both ways (but kept the new page experience in my final code, becaues it felt cleaner to me). I included a video of the experience if the element was re-rendered with the new url, and the code below: 

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
For styling, I used CSS Grid for extremely simple styling. I wanted things to look clean, but I couldn't spend too much time on it, unfortunately.

### Next Steps
If I had more time, I would have spent more time on the grid itself, improving the UI, making things responsive, improve the spacing / displaying of the album covers (so that there are not inconsistencies based on the length of the album title), improve a11y, and fix the issues with data / scale that I mentioned above. 

### Create React App README

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

