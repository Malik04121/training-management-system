import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AllRoute } from "./routes/mainRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calculator from "./Calculator";
import { useDispatch } from "react-redux";
import { checkToken } from "./redux/slice/authenticationSlice";

function App() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(localStorage.getItem("isLogin"));
  const [username, setUsername] = useState(localStorage.getItem("username")); 
  const [role, setRole] = useState(localStorage.getItem("role")); 

//Todo:trainer remove button not working
//Todo:give edit option whenever necessary
//Todo:if course is completed then dont show on home page or any other section only show in trainer section 
  //Todo:push notification
  //Todo:email service
  //Todo:add trainer page
  //Todo:filter and search on dashboard each page
  //Todo: Mongo query
  //Todo:if populate use then aggregation will be used
  //Todo:dashboard is giving error on refreshing
  //Todo:Figure out login condition when someone remove from local storage ask with any dev there is bug in program when i changed the local storage that time in app after resetting the localStorage duplicacy occur
  //Todo:correct code in middleware

  useEffect(() => {
    const verifyToken = async () => {
      // console.log("inside verifyToken");
       dispatch(checkToken());
    };
    verifyToken()
    const handleStorageChange = (event) => {
      if (["isLogin", "username", "role"].includes(event.key)) {
        // console.log(`Field changed: ${event.key} = ${event.newValue}`);
        if (event.key === "isLogin") setLogin(event.newValue);
        if (event.key === "username") setUsername(event.newValue);
        if (event.key === "role") setRole(event.newValue);
        verifyToken();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return (
    <>
      {/* <Header/> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AllRoute />
      {/* <Calculator/> */}
    </>
  );
}

export default App;
