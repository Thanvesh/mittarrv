import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import Pagination from '../../components/Pagination';
import axios from 'axios';
import filterData from "../filterUtils";
import "./Recipe.css";
import RecipeItem from "../../components/RecipeItem";
const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

export const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [apiStatus, setApistatus] = useState(renderConstraints.initial);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter
  const [categories, setCategories] = useState([]); // State to store unique categories
  const itemsPerPage = 20;

  const fetchRecipes = async () => {
    setApistatus(renderConstraints.loading);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const recipeList = [];

    for (let letter of alphabet) {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = response.data;
        if (data.meals) {
          recipeList.push(...data.meals.map(meal => ({...meal, isFavorite: false })));
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    setInitialState(recipeList);
  };
  const setInitialState = (recipeList) => {
    let favoriteRecipesFromStorage = localStorage.getItem('favoriteRecipes');
    favoriteRecipesFromStorage = favoriteRecipesFromStorage ? JSON.parse(favoriteRecipesFromStorage) : [];
    const recipeListMap = new Map(recipeList.map(item => [item.idMeal, item]))
    favoriteRecipesFromStorage.forEach(item => {
      const meal = recipeListMap.get(item.idMeal);
      if(meal) {
        meal.isFavorite = true;
      }
    })
    const Recipes = Array.from(recipeListMap.values());
    setRecipes(Array.from(recipeListMap.values()));
    localStorage.setItem("recipes", JSON.stringify(Recipes));
    setApistatus(renderConstraints.success);

    // Extract unique categories from the fetched recipes
    const uniqueCategories = [...new Set(recipeList.map(recipe => recipe.strCategory))];
    setCategories(uniqueCategories);
  }

  useEffect(() => {
    let recipeList = localStorage.getItem("recipes");
    recipeList = recipeList ? JSON.parse(recipeList) : []
    if(recipeList.length > 0) {
      setInitialState(recipeList);
      return;
    }

    fetchRecipes();
  }, []);

  const renderLoaderView = () => (
    <Loader />
  );

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToFavorites = (recipe) => {
    console.log(recipe);
    const updatedRecipes = recipes.map(item => {
      if (item.idMeal === recipe.idMeal) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    const updatedFavorites = updatedRecipes.filter(item => item.isFavorite);
    setRecipes(updatedRecipes);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFromFavorites = (recipe) => {
    const updatedRecipes = recipes.map(item => {
      if (item.idMeal === recipe.idMeal) {
        return { ...item, isFavorite: false };
      }
      return item;
    });

    setRecipes(updatedRecipes);
    const updatedFavorites = favoriteRecipes.filter(favRecipe => favRecipe.idMeal !== recipe.idMeal);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
  };

  const filteredData = filterData(recipes, searchValue);

  // Filter data based on category
  const filteredDataByCategory = categoryFilter ? filteredData.filter(recipe => recipe.strCategory === categoryFilter) : filteredData;

  const renderSuccessView = () => {
    return (
      <div className="books-main-container">
        <h1 className="heading">
          <Link to="/Recipe" className="text-book">Recipe Book</Link>
        </h1>
        <div className="books-filter-container">
          <div className="search-sort-container">
            <div className="search-container">
              <input className="search-box" onChange={handleSearchInput} type="search" value={searchValue} name="search" placeholder="Search By Recipe Title" />
            </div>
            <div className="category-filter-container">
              <select className="category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option className="category_option" value="">All Categories</option>
                {/* Dynamically generate options based on categories */}
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-list-container">
            {displayedItems.map((meal) => (
              <RecipeItem
                key={meal.idMeal}
                meal={meal}
                handleToggleFavorite={meal.isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
              />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          data={filteredDataByCategory} // Pass filtered data based on category
          itemsPerPage={itemsPerPage}
        />
      </div>
    );
  }

  const renderSwitchView = () => {
    switch (apiStatus) {
      case renderConstraints.loading:
        return renderLoaderView();
      case renderConstraints.success:
        return renderSuccessView();
      default:
        return null;
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredDataByCategory.length);
  const displayedItems = filteredDataByCategory.slice(startIndex, endIndex);

  return (
    renderSwitchView()
  );
}
