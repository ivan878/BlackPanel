import React, { useState }  from "react";
import logoImage from '../assets/logo.png';
import Menulist from "../components/menu";
import Themechange from "../components/theme";
import { useNavigate  } from 'react-router-dom';

import { Layout } from 'antd';



const { Sider } = Layout;

function Sidebar() {
    const navigate = useNavigate();

 
    const [dark, setDark] = useState(true);
    const toggletheme = () => {
        setDark(!dark);
    }
   return     <Layout><Sider theme={dark? 'dark' : 'light'} className="sidebar">
    <img src={logoImage} alt="Logo Black-Comics" className="image-style1" />
    <Menulist dark= {dark} dash={()=>navigate('/dashboard')}/>
   <Themechange darktheme={dark}  toggletheme={toggletheme} />
</Sider> 
</Layout> 

};
export default Sidebar;