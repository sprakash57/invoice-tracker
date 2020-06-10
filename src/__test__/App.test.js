import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import App from '../App';

const mockStore = configureStore();
const initState = {
  storyReducer: {
    stories: { hits: [] },
    votes: []
  }
}
const store = mockStore(initState);

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/Vote Count/i);
  expect(linkElement).toBeInTheDocument();
});
