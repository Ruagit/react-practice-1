import React from "react";
import { Route, Switch } from "wouter";
import { SearchPage } from "./pages/Search";
import { FavouritesPage } from "./pages/Favourites";
import { Nav } from "./components/Navigation";
import { paths } from "./constants";
import "./App.css";
import "./Flexbox.css";

const App: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        <Switch>
          <Route path={paths.search} component={SearchPage} />
          <Route path={paths.favourites} component={FavouritesPage} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
