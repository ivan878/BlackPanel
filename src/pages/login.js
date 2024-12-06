import React, { useState } from 'react';
import { auth } from '../firebase';
import '../styles/login.css';
import logoImage from '../assets/logo.png';
import { Input,Button } from 'antd';
import {  Spin  } from 'antd';
import { useNavigate } from 'react-router-dom';





function Login() {
  

  
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false);
    const adminlogin = async (email,password)  =>{
        // auth.singInWithEmailAndPassword(email,password).then(res=>{
        //     console.log('connecté avec succes');
        // }).catch(err => {
        //     console.log('erreur est',err);
        // })
        setloading(true);
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          navigate('/menu');
        console.log(email,password);
        } catch (error) {
          setError('mots de passe ou adresse incorrect');
        }
        setloading(false);
       // console.log(email,password);
    }
   
    
    return ( 
<div>
  
       <div className='loginbody'>
     
            <form method='post' onSubmit={adminlogin} className='loginform'>
                <div className='row pos'>
                    <div className='column lg htotal'>
                        <div className='mgt'>
                                <div className='row center'> 
                                    <img src={logoImage} alt="Logo Black-Comics" className="image-style" />
                                    <div><h4>BLACK-COMICS</h4></div>
                                </div> 
                                {error && <p className='error'>{error}</p>}
                                <h1 className='center'>Welcome Back!</h1>
                                <span className='center'>Merci d'entrez vos informations pour continuer</span>
                                <div className='formulaire'>
                                    <form className='fform mgt'>
                                        <div className='form-group'>
                                            <label className="fname">Identifiants</label>
                                            <Input placeholder="Basic usage" value={email} onChange={e=>setEmail(e.currentTarget.value)} />
                                        </div>
                                        <div className='form-group'>
                                            <label className="fname">Mots de passe</label>
                                                <Input.Password
                                                value={password} onChange={e=> setPassword(e.currentTarget.value)}
                                                placeholder="password"
                                                visibilityToggle={{
                                                    visible: passwordVisible,
                                                    onVisibleChange: setPasswordVisible,
                                                }}
                                                />
                                        </div>
                                        <div className='form-group'>
                                            <Button type="primary"  className='btn1 btnl' onClick={ () =>adminlogin(email, password)}>Log in</Button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                    <div className='hide column htotal dsg center '>
                        <img src={logoImage} alt="Logo Black-Comics" className="image-style2" />
                    </div>
                </div>
                <Spin spinning={loading} fullscreen />
  
  
            </form>
        </div>
   
        </div> 
    );
};
export default Login;