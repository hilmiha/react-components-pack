import MainTemplate from '../templates/main-template';
import PlaygroundPage from './playground-page';
import ComponentsPage from './components-page';
import { Navigate, Route, Routes } from 'react-router-dom';

const Main = () =>{
	return(
		<MainTemplate>
			<Routes>
				<Route path="/" element={<Navigate to={'/components'}/>}/>
				<Route path="/components/*" element={<ComponentsPage />}/>
				<Route path="/playground/*" element={<PlaygroundPage />}/>
			</Routes>
		</MainTemplate>
	)
}

export default Main