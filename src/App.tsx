import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.scss'
import Modal from './components/modal';
import { useContext, useEffect } from 'react';
import { GlobalContext, GlobalContextType } from './context/globalcontext';
import MainTemplate from './container/templates/main-template';
import PlaygroundPage from './container/pages/playground-page';
import ComponentsPage from './container/pages/components-page';

function App() {
	const navigate = useNavigate()
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;

	const {
		isShowGlobalModal,
		setIsShowGlobalModal,
		globalModal
    } = useContext(GlobalContext) as GlobalContextType;
	
	useEffect(()=>{
		if(location.hash) {
			console.log(location.hash)
			navigate(location.pathname, {replace:true})
		}
	},[])

	return (
		<div className='App' id="custom-root-id">
			<MainTemplate>
				<Routes location={previousLocation || location}>
					<Route path="/" element={<PlaygroundPage />}/>
					<Route path="/components/*" element={<ComponentsPage />}/>
					<Route path="/playground" element={<PlaygroundPage />}/>
				</Routes>
			</MainTemplate>
			
			
			<Modal
				isOpen={isShowGlobalModal}
				setIsOpen={setIsShowGlobalModal}
				{...globalModal}
			/>
		</div>
	);
}

export default App;
