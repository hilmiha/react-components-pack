import React from 'react';
import { ModuleStateProvider } from './ModuleContext/ModuleContext';

const HocProvider = (Component) => props => {
    return (
        <ModuleStateProvider>
            <Component {...props}>
            </Component>
        </ModuleStateProvider>
    )
}

export default HocProvider;
