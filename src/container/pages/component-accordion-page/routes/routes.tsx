import React from 'react';
const OverviewPage = React.lazy(() => import('../components/overview-page'));
const ApiPage = React.lazy(() => import('../components/api-page'));

const route = [
    {path: '/overview', component: <OverviewPage/>},
    {path: '/api', component: <ApiPage/>}
];

export default route;