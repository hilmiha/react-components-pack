import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.scss'
import Playground from './page/playground';
import Modal from './components/modal';
import { useContext, useEffect } from 'react';
import { GlobalContext, GlobalContextType } from './context/globalcontext';
import TablePage from './page/tablepage';

function App() {
	const navigate = useNavigate()
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;

	const {
        mediaSize,
		isShowGlobalModal,
		setIsShowGlobalModal,
		globalModal, 
        setGlobalModal
    } = useContext(GlobalContext) as GlobalContextType;
	
	useEffect(()=>{
		if(location.hash) {
			console.log(location.hash)
			navigate(location.pathname, {replace:true})
		}
	},[])

	return (
		<div className='App' id="custom-root-id">
			<Routes location={previousLocation || location}>
				<Route path="/playground" element={<Playground />}/>
				<Route path="/table" element={<TablePage />}/>
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
