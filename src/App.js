
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Recipe } from "./pages/Recipe";
import { SignIn } from "./pages/SignIn"
import {SignUp} from "./pages/SignUp"
import Cookies from "js-cookie"
import Header from "./components/Header";
import Favourite from "./components/Favourites";
import { RecipeDetails } from "./pages/RecipeDetails";


function isAuthenticated() {
  // Define your authentication logic here
  // Example: Check if the user is logged in
  const jwtToken = Cookies.get('jwt_token');
  return jwtToken !== undefined;
}

function App() {
  return (
    <BrowserRouter>
    <Header/>
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp/>}/>
            
            <Route path="/" element={isAuthenticated()?<Recipe />:<Navigate to="/login" replace/>} />
            <Route path="/Recipe/:id" element={isAuthenticated() ? <RecipeDetails/> : <Navigate to="/login" replace />} exact/>
            <Route path="/favourite" element={isAuthenticated()?<Favourite />:<Navigate to="/login" replace/>} exact/>
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
