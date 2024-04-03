import React from 'react';
const ExamplePage = React.lazy(() => import('../components/example-page'));
const CodePage = React.lazy(() => import('../components/code-page'));

const route = [
    {path: '/example', component: <ExamplePage/>},
    {path: '/code', component: <CodePage/>}
];

export default route;