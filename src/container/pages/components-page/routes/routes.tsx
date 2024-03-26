import React from 'react';
const ButtonPage = React.lazy(() => import('../../component-button-page'));
const DatePickerPage = React.lazy(() => import('../../component-date-picker-page'));
const DrawerPage = React.lazy(() => import('../../component-drawer-page'));
const DropdownMenuPage = React.lazy(() => import('../../component-dropdown-menu-page'));
const FormFieldPage = React.lazy(() => import('../../component-form-field-page'));
const ImagePage = React.lazy(() => import('../../component-image-page'));
const ModalPage = React.lazy(() => import('../../component-modal-page'));
const PillFlairPage = React.lazy(() => import('../../component-pill-flair-page'));
const TablePage = React.lazy(() => import('../../component-table-page'));

const route = [
    {path: '/button', component: <ButtonPage/>},
    {path: '/date-picker', component: <DatePickerPage/>},
    {path: '/drawer', component: <DrawerPage/>},
    {path: '/dropdown-menu', component: <DropdownMenuPage/>},
    {path: '/form-field', component: <FormFieldPage/>},
    {path: '/image', component: <ImagePage/>},
    {path: '/modal', component: <ModalPage/>},
    {path: '/pill-flair', component: <PillFlairPage/>},
    {path: '/table', component: <TablePage/>}
];

export default route;