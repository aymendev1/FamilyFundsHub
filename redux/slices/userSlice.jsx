import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an async thunk to fetch data from the database

export const fetchDataFromDB = createAsyncThunk(
  "data/fetchDataFromDB",
  async () => {
    // Replace with your actual database fetch logic here
    const response = await fetch(`/api/userData/`);
    const data = await response.json();
    return data;
  }
);

// Create a slice
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataFromDB.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDataFromDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
