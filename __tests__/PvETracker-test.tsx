import React from 'react';
import renderer from 'react-test-renderer';
import PvETracker from '../src/views/PvETracker';

import {NativeBaseProvider} from "native-base";

it('renders correctly', () => {
    const tree = renderer.create(
        <NativeBaseProvider>
            <PvETracker/>
        </NativeBaseProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
});
