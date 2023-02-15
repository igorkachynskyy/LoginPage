import {Routes, Route, Navigate} from 'react-router-dom'
import {Login} from './Login';
import User from './User';
import { Register } from './Register';
function App() {
  return (
    <Routes>
    <Route index element={<Navigate to="login"/>}></Route>
    <Route path="login" element={<Login/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="user/:id" element={<User/>}></Route>
    <Route path="*" element={<></>}></Route>
    </Routes>
  );
}

export default App;
