import React from 'react';
import {useNavigate } from 'react-router-dom';
import "../../pages/Recipe/Recipe.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'; // Import the outlined heart icon

const RecipeItem = ({ meal, handleToggleFavorite }) => {
    const navigate = useNavigate();

    const isFavorite = meal.isFavorite;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        handleToggleFavorite(meal);
    }
    const handleRecipeClick = () => {
        navigate(`/Recipe/${meal.idMeal}`);
    }
    return (
        <li key={meal.idMeal} className="book-card" onClick={handleRecipeClick}>
            {/* <Link to={`/Recipe/${meal.idMeal}`} className="link-no-decoration"> */}
                <img className="card-image" src={meal.strMealThumb} 
                alt={meal.strMeal} />
                <div className="card-text-details">
                    <h1 className="card-title">{meal.strMeal}</h1>
                    <div className='add_details'>
                        <div className='other_details'>
                            <p className="card-price">{meal.strCategory}</p>
                            <p className="card-price">{meal.strArea}</p>
                        </div>
                        
                        <FontAwesomeIcon
                            onClick={handleFavoriteClick}
                            style={{ height: '50px', width: '20px', color: isFavorite ? "#FF0000" : "" }}
                            icon={isFavorite ?faHeart : faHeartOutline}
                        />  
                    </div>
                </div>
            {/* </Link> */}
            
        </li>
    );
};

export default RecipeItem;
