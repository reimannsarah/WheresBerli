import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./slices/petSlice";
import locationReducer from "./slices/locationSlice";

const store = configureStore({
  reducer: {
    pet: petReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
