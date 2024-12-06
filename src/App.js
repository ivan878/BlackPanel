import React, {useState  } from "react";
import {Menu ,Drawer } from 'antd';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { useNavigate, Route, Routes } from 'react-router-dom'; 
import logoImage from './assets/logo.png';
import adminLogo from './assets/admin.png';
import {HomeOutlined,SettingOutlined,UserOutlined,SwitcherOutlined,ShopOutlined,VideoCameraAddOutlined} from "@ant-design/icons";
import Dashboard from "./pages/dashboard";
import UserPage from "./pages/userpage";
import Oeuvre from "./pages/oeuvre";
import Publicite from "./pages/publicite";
import Video from "./pages/video";
import Login from "./pages/login";


function App(){
   
    

    return ( <div>
       <Header /><SiderMenu />
     
    </div>
    );
}
// function Home () {
//     return (
//         <><Header /><SiderMenu /></>
//     );
// }
function Header () {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };
  return( <div className="head">
              <div className="img">
                 <img src={logoImage} alt="Logo Black-Comics" className="image-st" />
              </div>
               <div className="text">
                  <h1 className="title">BlackComics</h1>
              </div>
               <div className="icon">
                  <img src={adminLogo} alt="Logo Admin" className="image-ad" onClick={showDrawer} /> 
              </div>
                 <Drawer title="Information sur le compte" onClose={onClose} open={open}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
         </div>
         );
         
}
function SiderMenu () {
  const navigate = useNavigate();
  return (
    <div className="sider">
         <div>
            <Menu   className="menu-bar" theme="dark"
                onClick={({key})=>{
                    if(key === "deconnexion") {

                    } else {
                         navigate(key);
                    }
                
                }}
               
                items={
                    [
                        {
                            label: 'dashboard',
                            icon:<HomeOutlined/>,
                            key: "/dashboard"
                        },
                        {
                            label: 'Utilisateurs',
                            icon: <UserOutlined />,
                            key: "/userPage"
                        },
                        {
                            label: 'Oeuvre',
                            icon: <SwitcherOutlined />,
                            key: "/oeuvre"
                        },
                        {
                            label: 'Video',
                            icon:<VideoCameraAddOutlined />,
                            key: "/video"
                        },
                        {
                            label: 'Publicités',
                            icon: <ShopOutlined />,
                            key: "/Publicite"
                        },
                        {
                            label: 'Déconnexion',
                            icon: <SettingOutlined/>, danger: true,
                            key: "Déconnexion"
                        }
                    ]
                }
            >
            </Menu>
          </div>
            <div className="cont">
              <Content />
            </div>
        </div>
  );
}

function Content () {
    return <div className="">
      <Routes>
          <Route exact path="/" element={<div className=""> <Login/> </div>} />
          <Route exact path="/dashboard" element={<div className=""> <Dashboard/> </div>} />
          <Route exact path="/userPage" element={<div> <UserPage/> </div>} />
          <Route exact path="/oeuvre" element={<div> <Oeuvre/> </div>} />
          <Route exact path="/video" element={<div> <Video/> </div>} />
          <Route exact path="/Publicite" element={<div> <Publicite/> </div>} />
          <Route exact path="Déconnexion" element={<div>dashbord</div>} />
      </Routes>
      </div>    
}
export default App; 


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();