import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk("userData/loginUser", async());

export default createSlice({
  name: "userData",
  extraReducers: {},
});
