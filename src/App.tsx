import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          newestOnTop
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 
                  text-white rounded-xl shadow-lg border border-white
                  backdrop-blur-sm px-5 py-3 text-lg font-bold font-vazir
                  animate-fadeIn"
          progressClassName="!bg-blue-400 !h-1 !rounded-full !shadow-[0_0_10px_#3b82f6]"
          className="!top-6 !right-6"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
