import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalContext";
import Playground from "./pages/_playground";
import './App.css'

function App() {

	const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/*' element={<Playground/>}/>
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
