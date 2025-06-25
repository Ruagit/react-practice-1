import React, { useState } from "react";
import { Route, Switch } from "wouter";
import "./App.css";
import { Nav } from "./components/Navigation";
import { paths } from "./constants";
import "./Flexbox.css";
import { ImageContext } from "./hooks/imageContext";
import { FavouritesPage } from "./pages/Favourites";
import { SearchPage } from "./pages/Search";
import { ImageState, ImageType } from "./types";



const App: React.FC = () => {
  const [images, setImages] = useState<ImageState>([]);
  const [favouriteImages, saveFavouriteImages] = useState<ImageState>([]);
  const [favouriteImagesIds, setFavouritesImagesId] = useState<string[]>([]);

   const removeFavouriteImage = (image: ImageType) => {
    saveFavouriteImages((prevFavourites) =>
      prevFavourites.filter((item) => item.id !== image.id)
    );

    setFavouritesImagesId((prevFavouritesId) =>
      prevFavouritesId.filter((item) => item !== image.id)
    );
  };

  const setFavouriteImages = (favouriteImage: ImageType) => {
    saveFavouriteImages((prevFavourites) => [...prevFavourites.filter((item) => item.id !== favouriteImage.id)
    , {...favouriteImage, favourited : true}]);

    setFavouritesImagesId((prevFavouritesId) => [...prevFavouritesId.filter((item) => item !== favouriteImage.id)
    , favouriteImage.id]);
    };


  
  return (
    <div>
      <Nav />
      <main>
        <Switch>
          <ImageContext.Provider value={{images, favouriteImages, favouriteImagesIds, setImages, setFavouriteImages, removeFavouriteImage}}>
          <Route path={paths.search} component={SearchPage} />
          <Route path={paths.favourites} component={FavouritesPage} />
          </ImageContext.Provider>
        </Switch>
      </main>
    </div>
  );
};

export default App;
