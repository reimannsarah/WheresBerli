import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LocationState = {
  userLatitude: number;
  userLongitude: number;
};

const initialState: LocationState = {
  userLatitude: 0,
  userLongitude: 0,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.userLatitude = action.payload.latitude;
      state.userLongitude = action.payload.longitude;
    },
    clearLocation: (state) => {
      state.userLatitude = 0;
      state.userLongitude = 0;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
