import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/components/elements/Button';
import { Chip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { EditRounded, DeleteRounded, MoreVert, SaveAs } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { addTodos, Todo, selectTodos, updateStatus, deletedTodos, updateTodos, handleEdit } from '@/features/todos/todosSlice';
import configs from '@/configs';
import { nanoid } from '@reduxjs/toolkit';

function Todos(props: { data: Record<string, unknown>, api_endpoint: string }) {
  const [todo, setTodo] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [todoId, setTodoId] = useState('');
  const [todoStatus, setTodoStatus] = useState('');

  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    const idxTodos = todos.findIndex(el => el.id === id);
    setTodoStatus(todos[idxTodos].status);
    setTodoId(id); 
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    data: Record<string, string>
  ) => {
    dispatch(updateStatus(data));
    setTodoStatus(data.status);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTodo = (data: Todo): void => {
    if (!todo.length) return;
    dispatch(addTodos(data));
    setTodo('');
  };

  const statusColor: {
    [key: string]: 'default' | 'primary' | 'success'
  } =
  {
    done: 'success',
    in_progress: 'primary',
    todo: 'default',
  };

  return (
    <div className={styles.todoWrapper}>
      <input className={styles.inputField} onChange={(e) => setTodo(e.target.value)} value={todo} />
      <Button className={styles.btn} onClick={() => handleAddTodo(
        {
          id: nanoid(), item: todo, status: 'todo'
        }
      )} variant="primary">+ Add Todos</Button>
      <div className={styles.listTodosWrapper}>
        {todos.length ? todos.map(el => (
          <div className={styles.todo} key={el.id}>
            {el.isEdit ?
              <input className={styles.inputField} onChange={(e) =>
                dispatch(updateTodos({ ...el, item: e.target.value }))}
              style={{ marginRight: 16 }} value={el.item} /> :
              <Typography fontSize="small" variant="body1" >{el.item}</Typography>}
            <div className={styles.actionTodo}>
              <Chip color={statusColor[`${el.status}`]} label={el.status} size="small" variant="outlined" />
              <IconButton aria-label="edit" onClick={() => dispatch(handleEdit(el.id))} size="small" >
                {el.isEdit ? <SaveAs fontSize="inherit" /> : <EditRounded fontSize="inherit" />}
              </IconButton>
              <IconButton aria-label="delete" onClick={() => dispatch(deletedTodos(el.id))} size="small">
                <DeleteRounded fontSize="inherit" />
              </IconButton>
              <IconButton aria-label={`${el.id}-more-btn`} onClick={(e) => handleClickListItem(e, el.id)} size="small">
                <MoreVert fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        )) : <Typography fontSize="small" variant="body1">There{`'`}s no Todo Item</Typography>}
      </div>
      <Menu
        anchorEl={anchorEl}
        id={`more-menu`}
        onClose={() => handleClose()}
        open={open}
      >
        {['todo', 'in_progress', 'done'].map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => handleMenuItemClick(event, {
              id: todoId, status: option
            })}
            selected={`${todoId}${todoStatus}` === `${todoId}${option}`}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Typography variant="body1">
        API ENDPOINT: {props.api_endpoint}
      </Typography>
      <Typography variant="caption">
        APP VERSION: {configs.APP_VERSION}
      </Typography>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  /* eslint-disable no-console */
  console.log(`API ENDPOINT: ${configs.BASE_URL_API}`);
  const res = await fetch('https://api.github.com/users/fadlytanjung');
  const data = await res.json();
  // Pass data to the page via props
  return {
    props: {
      data,
      api_endpoint: configs.BASE_URL_API
    }
  };
}
export default Todos;
