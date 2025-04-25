import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PetState = {
  petName: string;
  petType: string;
  petLongitude: number;
  petLatitude: number;
};

const initialState: PetState = {
  petName: '',
  petType: '',
  petLongitude: 0,
  petLatitude: 0,
};

export const petSlice = createSlice({
  name: 'pet',
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
      state.petLongitude = 0;
      state.petLatitude = 0;
    }
  },
});

export const { setPetName, setPetType, setPetLocation } = petSlice.actions;

export default petSlice.reducer;
