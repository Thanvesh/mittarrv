

const filterData = (mealsData, searchValue) => {
    return mealsData.filter((meal) => {
        const mealName = meal.strMeal ? meal.strMeal.toLowerCase() : "";
        const mealCategory = meal.strCategory ? meal.strCategory.toLowerCase() : "";

        // Check if meal name or category includes search value
        return mealName.includes(searchValue.toLowerCase()) || mealCategory.includes(searchValue.toLowerCase());
    });
};

export default filterData;