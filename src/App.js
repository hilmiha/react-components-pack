import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalContext";
import Playground from "./pages/_playground";
import './App.css'
import ComponentPages from "./pages/ComponentPages";

function App() {

	const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/*' element={<></>}/>
                <Route path='/components/*' element={<ComponentPages/>}/>
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
