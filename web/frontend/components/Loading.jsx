import {Frame, Loading} from '@shopify/polaris';
import React from 'react';

export default function LoadingExample() {
    return (
        <div style={{height: '100px'}}>
            <Frame>
                <Loading />
            </Frame>
        </div>
    );
}
