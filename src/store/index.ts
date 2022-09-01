import { configureStore, combineReducers, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import collectionsReducer from '../features/collections/collectionSlice';
import todosReducer from '../features/todos/todosSlice';
import authReducer from '../features/auth/authSlice';

const combinedReducer = combineReducers({
  collections: collectionsReducer,
  todos: todosReducer,
  auth: authReducer,
});

const reducer: typeof combinedReducer = (state, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};


export const store = configureStore({
  reducer,
});

export const makeStore = () => store;
  
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });
