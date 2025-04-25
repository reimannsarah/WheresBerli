import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LocationState = {
  userLatitude: number | null;
  userLongitude: number | null;
};

const initialState: LocationState = {
  userLatitude: null,
  userLongitude: null,
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
      state.userLatitude = null;
      state.userLongitude = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
