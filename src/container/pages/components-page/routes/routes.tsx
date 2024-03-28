import React from 'react';
const ButtonPage = React.lazy(() => import('../../component-button-page'));
const IconButtonPage = React.lazy(() => import('../../component-icon-button-page'));
const SplitButtonPage = React.lazy(() => import('../../component-split-button'));
const DatePickerPage = React.lazy(() => import('../../component-date-picker-page'));
const DrawerPage = React.lazy(() => import('../../component-drawer-page'));
const DropdownMenuPage = React.lazy(() => import('../../component-dropdown-menu-page'));
const DatePickerFieldPage = React.lazy(() => import('../../component-date-picker-field-page'));
const SelectionFieldPage = React.lazy(() => import('../../component-selection-field-page'));
const TextFieldPage = React.lazy(() => import('../../component-text-field-page'));
const ImagePage = React.lazy(() => import('../../component-image-page'));
const ModalPage = React.lazy(() => import('../../component-modal-page'));
const PillFlairPage = React.lazy(() => import('../../component-pill-flair-page'));
const TablePage = React.lazy(() => import('../../component-table-page'));

const route = [
    {path: '/button', component: <ButtonPage/>},
    {path: '/icon-button', component: <IconButtonPage/>},
    {path: '/split-button', component: <SplitButtonPage/>},
    {path: '/date-picker', component: <DatePickerPage/>},
    {path: '/drawer', component: <DrawerPage/>},
    {path: '/dropdown-menu', component: <DropdownMenuPage/>},
    {path: '/date-picker-field', component: <DatePickerFieldPage/>},
    {path: '/selection-field', component: <SelectionFieldPage/>},
    {path: '/text-field', component: <TextFieldPage/>},

    {path: '/image', component: <ImagePage/>},
    {path: '/modal', component: <ModalPage/>},
    {path: '/pill-flair', component: <PillFlairPage/>},
    {path: '/table', component: <TablePage/>}
];

export default route;