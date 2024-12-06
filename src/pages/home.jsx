import React, { useState }  from "react";
import '../styles/home.css';
import { Layout } from 'antd';
import logoImage from '../assets/logo.png';
import admin from '../assets/admin.png';
import Menulist from "../components/menu";
import Themechange from "../components/theme";
import { Modal } from 'antd';
import { useNavigate  } from 'react-router-dom';


const {Header, Sider} = Layout;

function Home () {
    const navigate = useNavigate();

 
    const [dark, setDark] = useState(true);
    const toggletheme = () => {
        setDark(!dark);
    }
    const [isModalOpen, setisModalOpen] = useState(false);
const showModal = () =>{
    setisModalOpen(true);
}
const closeModale = () => {
    setisModalOpen(false);
}
    return (
        <Layout>
            <Sider theme={dark? 'dark' : 'light'} className="sidebar">
                 <img src={logoImage} alt="Logo Black-Comics" className="image-style1" />
                 <Menulist dark= {dark} dash={()=>navigate('/dashboard')} user={()=>navigate('/userPage')} oeuvre={()=>navigate('/oeuvre')} pub={()=>navigate('/publicite')} />
                <Themechange darktheme={dark}  toggletheme={toggletheme} />
            </Sider> 
            <Layout>
                <Header className="header-p">
                    <div className="form-header">
                         <img src={admin} onClick={showModal} alt="Logo Black-Comics" className="image-style3" />
                    </div>
                   
                     {/* <Button type="primary" shape="circle" icon={<SearchOutlined />} /> */}
                </Header>
            </Layout>
             <Modal footer={null} closeIcon={null} title="information sur le compte admin" open={isModalOpen}  onCancel={closeModale}>
                
             </Modal>
        </Layout> 
    )
};
export default Home;