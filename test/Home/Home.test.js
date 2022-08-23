import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Home from '@/pages/Home';

describe('Test Home Page', () => {
  test('It should render with snapshot', async () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('It should find text', async () => {

    const { findByText, container } = render(<Home title="Fadly" />);
    const addBtn = await findByText('Add +');
    const h1Text = container.querySelector('h1');

    fireEvent.click(addBtn);
    expect(h1Text).toHaveTextContent('Total count: 1');
  });
});
