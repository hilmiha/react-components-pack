import React from 'react';
const ExamplePage = React.lazy(() => import('../components/example-page'));
const PropsPage = React.lazy(() => import('../components/props-page'));

const route = [
    {path: '/example', component: <ExamplePage/>},
    {path: '/props', component: <PropsPage/>}
];

export default route;