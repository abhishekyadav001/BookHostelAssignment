const { configureStore } = require("@reduxjs/toolkit");
const cartReducer = require("./cartSlice");

// Create the store directly
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

module.exports = { store }; // Export the store instance
