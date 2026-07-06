import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {

    return (

        <>

            <AppRoutes />

            <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="colored"
            />

        </>

    );

}

export default App;