import React,{useState, useEffect} from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {Modal,Spin, Input, Table } from 'antd';
import '../styles/user.css';
import { auth } from '../firebase';
 

function UserPage () {

  const columns = [
    {
      title: 'Photo',
      render: (ren) => {
        return <>
        <div className="imag">
             
        </div>
            
        </>
      },
      key: 'photo',
    },
    {
      title: 'nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'numeroTelephone',
      dataIndex: 'numeroTelephone',
      key: 'numeroTelephone',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      render: (record) => {
        return <>
        <div className="row lg">
           <button className="btndelete" >Supprimer</button>
        </div>
            
        </>
      },
      key: 'Action',
    },
  ]
      
 
  const [isModalOpen, setisModalOpen] = useState(false);
  const showModal = () =>{
      setisModalOpen(true);
  }
  const closeModale = () => {
      setisModalOpen(false);
  }
     
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersFromFirestore = async () => {
      try {
        const usersCollection = collection(db,'utilisateurs'); // 'utilisateurs' est le nom de votre collection Firestore
        const usersSnapshot = await getDocs(usersCollection);
        const userList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs depuis Firestore:', error);
      }
    };

    getUsersFromFirestore();
  }, []); 

  //fonction d'ajout d'un administrateur
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const createAdmin = async () => {
    closeModale();
    setloading(true);

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: displayName,
      });
      // L'utilisateur est créé avec succès
      console.log('Utilisateur créé avec succès:', userCredential.user);
    } catch (error) {
      setError(error.message);
    }
    setloading(false);
  };
   
   
    return  <div className="table">
              <div className="tab">
              <div className="divbtnadd">
                <button className="btnadd1" onClick={showModal}>Ajouter</button>
                {/* <Button className="btnadd1" onClick={showModal} type="primary">Ajouter</Button> */}
              </div>
              {error && <div style={{ color: 'red' }}>{error}</div>}
                <Table dataSource={users} columns={columns} />
                <Modal footer={null} closeIcon={true} title="Ajouter un Admin" open={isModalOpen}  onCancel={closeModale}>
                      <div className="body-form">
                                       <div className='form-group'>
                                            <label className="fname">NOM</label>
                                            <Input placeholder="Basic usage"  value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                                        </div>
                                        <div className='form-group'>
                                            <label className="fname">IDENTIFIANTS</label>
                                            <Input placeholder="Basic usage"  value={email}onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className='form-group'>
                                            <label className="fname">MOTS DE PASSE</label>
                                            <Input.Password placeholder="Basic usage" value={password} onChange={e => setPassword(e.target.value)}/>
                                        </div>
                                        <div className='form-group'>
                                            <button className="btnadd1" onClick={createAdmin}>Ajouter</button>
                                        </div>
                      </div>
                </Modal>
                <Spin spinning={loading} fullscreen />
                </div>
          </div>
     
 
}
export default UserPage;