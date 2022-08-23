import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../../store';

export type Todo = {
  id: string;
  item: string,
  status: string;
  isEdit?: boolean;
};
export interface TodoState {
  listTodos: Array<Todo>
}

const initialState: TodoState = {
  listTodos: [{
    id: '1',
    item: 'Todo 1',
    status: 'done',
    isEdit: true,
  }],
}

export const counterSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo>) => {
      state.listTodos.push(action.payload);
    },
    updateStatus: (state, action: PayloadAction<Record<string, string>>) => {
      const { id, status } = action.payload;
      const idx = state.listTodos.findIndex(el => el.id === id);
      state.listTodos[idx].status = status;
    },
    handleEdit: (state, action: PayloadAction<string>) => {
      const idx = state.listTodos.findIndex(el => el.id === action.payload);
      if (!state.listTodos[idx].item.length) return;
      state.listTodos[idx].isEdit = !state.listTodos[idx].isEdit;
    },
    deletedTodos: (state, action: PayloadAction<string>) => {
      state.listTodos = state.listTodos.filter(el => el.id !== action.payload);
    },
    updateTodos: (state, action: PayloadAction<Todo>) => {
      const { id, ...props } = action.payload;
      const idx = state.listTodos.findIndex(el => el.id === id);
      state.listTodos[idx] = { ...state.listTodos[idx], ...props};
    },
  },
})

export const { addTodos, deletedTodos, updateStatus, updateTodos, handleEdit } = counterSlice.actions

export const selectTodos = (state: AppState) => state.todos.listTodos;

export default counterSlice.reducer;
