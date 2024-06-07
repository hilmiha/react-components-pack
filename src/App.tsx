import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.scss'
import Modal from './components/modal';
import { useContext, useEffect } from 'react';
import { GlobalContext, GlobalContextType } from './context/globalcontext';
import Main from 'container/pages';

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
		<div className='App'>
			<Routes location={previousLocation || location}>
				<Route path="/*" element={<Main/>}/>
			</Routes>
			
			
			<Modal
				isOpen={isShowGlobalModal}
				setIsOpen={setIsShowGlobalModal}
				{...globalModal}
			/>
		</div>
	);
}

export default App;
