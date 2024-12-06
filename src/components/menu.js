import React, { } from "react";
import {Menu} from "antd";
import '../styles/menu.css';
import {  useNavigate, Route, Routes } from 'react-router-dom'; 

import {HomeOutlined,SettingOutlined,UserOutlined,SwitcherOutlined,ShopOutlined} from "@ant-design/icons";

function Menulist(){
    // const location = useLocation();
    // const [selectedkey, setselectedkey] = useState('/');
    // useEffect(()=>{
    //    const  pathName = location.pathname;
    //    setselectedkey(pathName);
    // }, [location.pathname] )
    const navigate = useNavigate();

    return ( <div className="sider">
            <Menu   
                onClick={(key)=>{
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
                            label: 'Publicités',
                            icon: <ShopOutlined />,
                            key: "/Publicite"
                        },
                        {
                            label: 'Paramètre',
                            icon: <SettingOutlined/>,
                            key: "/home"
                        }
                    ]
                }
            >
                
                {/* <Menu.Item key="1" onClick={dash} icon={<HomeOutlined/>} >
                 <Link to="dashboard">DASHBOARD</Link> 
                </Menu.Item>
                <Menu.Item key="2" onClick={user} icon={ <UserOutlined />} >
                    UTILISATEUR
                </Menu.Item>
                <Menu.Item key="3" onClick={oeuvre} icon={ <SwitcherOutlined />} >
                    OEUVRE
                </Menu.Item>
                <Menu.Item key="4" onClick={pub} icon={<ShopOutlined />} >
                    PUBLICITE
                </Menu.Item>
                <Menu.Item key="5" icon={<SettingOutlined/> } >
                    PARAMETRE
                </Menu.Item> */}
            </Menu>
           <Content/>
            </div>
    );
}

function Content () {
    return <div>

   
                    <Routes>
                        <Route exact path="/home" element={<div className="ct">home</div>} />
                        <Route exact path="/userPage" element={<div>userpage</div>} />
                        <Route exact path="/Publicite" element={<div>publicite</div>} />
                        <Route exact path="/dashboard" element={<div>dashbord</div>} />
                        <Route exact path="/oeuvre" element={<div>oeuvre</div>} />
                    </Routes>
                    </div>    
}
export default Menulist;