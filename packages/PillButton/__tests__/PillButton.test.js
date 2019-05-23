import React from 'react'; // eslint-disable-line
import { render, cleanup } from 'react-testing-library';
import Component from '../lib/PillButton';

afterEach(cleanup);

test(`render ${Component.name} Component`, () => {
    const props = {};
    render(<Component {...props}>Title</Component>);
});
