import React, { FC } from 'react';
import { styles } from './styles';

const ButtonReact: FC<{ className: string,  children: JSX.Element | string }> = (
  { className, children, ...props }) => (
  <button className={className} css={styles.primaryBtn} {...props}>
    {/* inline style*/}
    {children}
  </button>
);

export default ButtonReact;
