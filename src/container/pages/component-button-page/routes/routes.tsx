import React from 'react';
const OverviewPage = React.lazy(() => import('../components/overview'));
const ApiPage = React.lazy(() => import('../components/api-ref'));

const route = [
    {path: '/overview', component: <OverviewPage/>},
    {path: '/api', component: <ApiPage/>}
];

export default route;