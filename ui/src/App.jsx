import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { NotificationsPage } from './pages/NotificationsPage';

function App() {

  return (
    <>
      <ToastContainer />
      <NotificationsPage />
    </>
    
  );
}

export default App;
