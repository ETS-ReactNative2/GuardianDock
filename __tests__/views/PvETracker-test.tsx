import React from 'react';
import renderer from 'react-test-renderer';
import PvETracker from '../../src/views/PvETracker';

import {fireEvent, render} from "@testing-library/react-native";
import {NativeBaseProvider} from "native-base";

describe('PvETracker View', () => {
    it('Must render correctly', () => {
        const tree = renderer.create(
            <NativeBaseProvider>
                <PvETracker/>
            </NativeBaseProvider>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    });
})
