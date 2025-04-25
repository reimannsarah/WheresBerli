import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PetState = {
  petName: string;
  petType: string;
  petLongitude: number | null;
  petLatitude: number | null;
};

const initialState: PetState = {
  petName: '',
  petType: '',
  petLongitude: null,
  petLatitude: null,
};

export const petSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPetName: (state, action: PayloadAction<string>) => {
      state.petName = action.payload;
    },
    setPetType: (state, action: PayloadAction<string>) => {
      state.petType = action.payload;
    },
    setPetLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.petLatitude = action.payload.latitude;
      state.petLongitude = action.payload.longitude;
    },
    clearPet: (state) => {
      state.petName = '';
      state.petType = '';
      state.petLongitude = null;
      state.petLatitude = null;
    }
  },
});

export const { setPetName, setPetType, setPetLocation } = petSlice.actions;

export default petSlice.reducer;
