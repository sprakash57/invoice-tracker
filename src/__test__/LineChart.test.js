import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import LineChart from '../components/LineChart';

const mockStore = configureStore();
const initState = {
    storyReducer: {
        stories: { hits: [] },
        votes: []
    }
}
const store = mockStore(initState);
test('should render chart on main page', () => {
    const { queryByTestId } = render(
        <Provider store={store}>
            <LineChart />
        </Provider>
    );
    expect(queryByTestId('chart')).toBeTruthy();
});
