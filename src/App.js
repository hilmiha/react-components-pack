import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalContext";
import Playground from "./pages/_playground";
import './App.css'
import Dashboard from "./pages/Dashboard";

function App() {

	const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/*' element={<Dashboard/>}/>
                <Route path='/helloworld' element={<Playground/>}/>
            </>
        )
    );

	return(
		<GlobalStateProvider>
            <RouterProvider router={router} />
		</GlobalStateProvider>
	)
}

export default App;
