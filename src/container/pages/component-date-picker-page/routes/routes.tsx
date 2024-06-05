import React from 'react';
const ExamplePage = React.lazy(() => import('../components/example-page'));
const PropsPage = React.lazy(() => import('../components/props-page'));
const OverviewPage = React.lazy(() => import('../components/overview'));
const ApiPage = React.lazy(() => import('../components/api-ref'));

const route = [
    {path: '/example', component: <ExamplePage/>},
    {path: '/props', component: <PropsPage/>},
    {path: '/overview', component: <OverviewPage/>},
    {path: '/api', component: <ApiPage/>}
];

export default route;