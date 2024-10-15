import { Questions } from "./components/Exam/Questions"
import { Welcome } from "./components/Exam/Welcome"
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom"
import { NavigationBar } from "./components/Navbar/NavigationBar"
import { HomePage } from "./components/HomePage/HomePage"
import { SignUp } from "./components/SignUp/SignUp"
import { Login } from "./components/Login/Login"
import { ProfilePage } from "./components/UserManagement/ProfilePage"
import UserService from "./components/Service/UserService"
import { UserManagementPage } from "./components/UserManagement/UserManagementPage"
import { UpdateUser } from "./components/UserManagement/UpdateUser"
import { Navigate } from "react-router-dom"

function App() {
  return (
    <div className="vh-100 d-flex flex-column">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/homepage' element={<HomePage />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUp />} />

          {
            UserService.adminOnly() && (
              <>
                <Route path="/admin/user-management" element={<UserManagementPage/>}/>
                <Route path="/update-user/:userId" element={<UpdateUser/>}/>
              </>
            )
          }
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </div>
  )
}


//function Layout() {
//  const location = useLocation();
// const hideNavbarOnRoutes = ["/welcome", "/questions", "/signup","/login"];

// return (
//   <>
//    {!hideNavbarOnRoutes.includes(location.pathname) && (<> <NavigationBar /><HomePage /> </>)}
//   </>
// )

export default App
