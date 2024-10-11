import { configureStore } from '@reduxjs/toolkit';
import reducerExample from './reducer/reducerExample';

const store = configureStore({
  reducer: {
    // Add your reducers here
    reducerExample,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
