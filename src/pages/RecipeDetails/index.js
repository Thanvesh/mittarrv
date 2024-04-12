import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from "../Loader";
import "./Recipes.css";
import axios from 'axios';

const renderConstraints = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    fail: 'FAIL',
    loading: 'LOADING',
}

export const RecipeDetails = () => {
    const { id } = useParams();
    const [apiStatus, setApiStatus] = useState(renderConstraints.initial);
    const [recipeDetailsData, setRecipeDetails] = useState(null);

    const getRecipeData = async () => {
        setApiStatus(renderConstraints.loading);
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const { meals } = response.data; // Access data directly from the response object
            setRecipeDetails(meals[0]); // Set the first meal object as recipe details
            setApiStatus(renderConstraints.success);
        } catch (error) {
            console.error("Error Fetching Data:", error);
            setApiStatus(renderConstraints.fail);
        }
    };

    useEffect(() => {
        getRecipeData();
    }, []);

    const handleTryAgain = () => {
        getRecipeData();
    };

    const renderLoaderView = () => <Loader />;

    const renderFailureView = () => (
        <div className="failure-container">
            <h1>Something Went Wrong </h1>
            <button type="button" className="try-again-button" onClick={handleTryAgain}>Try Again</button>
        </div>
    );

    const renderSuccessView = () => {
        const {
            strMeal,
            strCategory,
            strInstructions,
            strMealThumb,
            strTags,
            strYoutube,
            ...ingredientsAndMeasures
        } = recipeDetailsData;

        const filteredIngredientsAndMeasures = Object.entries(ingredientsAndMeasures).filter(([key, value]) => value && key.includes("strIngredient"));
        const instructionsArray = strInstructions.split("STEP").filter(step => step.trim() !== "");

        return (
            <div className="main-container">
                <div className='inside-cont'>
                    <p className="heading">
                        <Link to="/Recipe" className="text">Recipe</Link>/
                        <Link to="/RecipeDetails">{strMeal}</Link>
                    </p>
                    <div className="book-image-details-container">
                        <div className="book-image-container">
                            <img className="large-image" src={strMealThumb} alt={strMeal} />
                        </div>
                        <div className="book-side-conatiner">
                            <div className='heading-category'>
                                <h1 className="details-heading">{strMeal}</h1>
                                <p className="details-category">{strCategory}</p>
                            </div>
                            <div>
                                <h1 className="desc-heading">Ingredients</h1>
                                <ol >
                                    {filteredIngredientsAndMeasures.map(([key, value]) => (
                                        <li key={key} className='desc-text'>
                                            <span>{value}</span>
                                            <span>{recipeDetailsData[`strMeasure${key.split("strIngredient")[1]}`]}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="desc-heading2">Instructions</h1>
                    <div className="instruction-steps">
                        {instructionsArray.map((step, index) => (
                            <p key={index}>{`STEP ${index + 1}: ${step.trim().replace(/^\d+\s/, '')}`}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderSwitchView = () => {
        switch (apiStatus) {
            case renderConstraints.loading:
                return renderLoaderView();
            case renderConstraints.success:
                return renderSuccessView();
            case renderConstraints.fail:
                return renderFailureView();
            default:
                return null;
        }
    }

    return renderSwitchView();
}
