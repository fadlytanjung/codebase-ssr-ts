/* eslint-disable react/require-default-props */
import React from 'react';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  children: string | JSX.Element;
  onClick: () => void;
  variant: string;
}

function Button(props: Props){
  const { children,className, onClick, variant } = props;
  const css = [
    styles.button,
    styles[variant],
    className
  ].join(' ');

  return <button className={css} onClick={onClick}>{children}</button>;
}

export default Button;

