const { createSlice } = require("@reduxjs/toolkit");

const initialState = { hostels: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.hostels.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.hostels = state.hostels.filter((id) => id !== action.payload);
    },
  },
});

module.exports = cartSlice.reducer;
module.exports.addToCart = cartSlice.actions.addToCart;
module.exports.removeFromCart = cartSlice.actions.removeFromCart;
