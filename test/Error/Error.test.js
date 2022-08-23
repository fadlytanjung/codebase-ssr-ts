import React from 'react';
import { render } from '@testing-library/react';
import Error from '@/pages/Error';

describe('Test Home Page', () => {
  test('It should render with snapshot', async () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});
