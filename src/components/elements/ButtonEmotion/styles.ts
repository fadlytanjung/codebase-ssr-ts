/* Example with @emotion/react */
import { css } from '@emotion/react';

//"react native style"
export const styles = {
  primaryBtn: css({
    backgroundColor: '#CF3D39',
    position: 'relative',
    display: 'flex',
    color: 'white',
    justifyContent: 'center',
    outline: 'none',
    padding: `12px 16px`,
    '&:hover':{
      backgroundColor: '#CF3D39'
    }
  })
};
