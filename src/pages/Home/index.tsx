import React, { useState } from 'react';
import Button from '@/components/elements/Button';
import ButtonReact from '@/components/elements/ButtonEmotion';
import ButtonStyled from '@/components/elements/ButtonTailwind';
import styles from './styles.module.css';

function HomePage(props: { title: string }) {
  const [count, setCount] = useState(0);

  return(
    <div className={styles.root}>
      <Button onClick={()=> setCount(count+1)} variant="primary">Add + </Button>
      <ButtonReact className={styles.overrideBtn}>Button @emotion/react</ButtonReact>
      <ButtonStyled className={styles.overrideBtn}>Button @emotion/styled</ButtonStyled>
      <h1>Total count: {count}</h1>
      <p>Welcome, {props.title}</p>
    </div>
  );
}

export default HomePage;

