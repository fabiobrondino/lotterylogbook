import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Ne pas oublier de typer les states
  // Les states qui seront utilisés par les composants
};

const reducerTypeSlice = createSlice({
  name: 'reducerExample',
  initialState,
  reducers: {
    // Les actions qui seront appelées par les composants
  },
});

// export const {} = reducerTypeSlice.actions;

export default reducerTypeSlice.reducer;
