import { useEffect, useState } from 'react';
import "./favr.css";
import RecipeItem from '../RecipeItem';

const Favourite = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
   
        const storedFavorites = localStorage.getItem('favoriteRecipes');
        if (storedFavorites) {
            setFavoriteRecipes(JSON.parse(storedFavorites));
        }
    }, []); 
    const handleRemoveFromFavorites = (recipe) => {
        const updatedFavorites = favoriteRecipes.filter(favRecipe => favRecipe.idMeal !== recipe.idMeal);
        setFavoriteRecipes(updatedFavorites);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));

    };


    return (
        <div className="favourite-container">
            <ul className="list-wrapper">

                {favoriteRecipes.length === 0 ? (
                    <h1 className='heading_nothing'>No Items are Added</h1>
                ) : (
                    favoriteRecipes.map((recipe) => (
                        <RecipeItem
                            key={recipe.idMeal}
                            meal={recipe}
                            handleRemoveFromFavorites={handleRemoveFromFavorites}

                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export default Favourite;
