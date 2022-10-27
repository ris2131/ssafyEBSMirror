import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
  reducer: {
    // auth: authSlice,
    // recipe: recipeSlice,
    // ingredient: ingredientSlice,
    user: userSlice
  },
});
