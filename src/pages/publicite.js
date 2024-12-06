import React, { useState, useEffect } from "react";
import { collection, deleteDoc, getDocs , doc} from 'firebase/firestore';
import '../styles/pub.css';
import { db } from '../firebase';
import { Spin ,Image,message,Popconfirm} from 'antd';
import { DeleteOutlined ,QuestionCircleOutlined,FileAddOutlined } from '@ant-design/icons';


function Publicite () {
    const [loading, setloading] = React.useState(true);
    const [error, setError] = useState(null);
    const [pubtab, setpubtab] = useState([]);
    //fonction qui supprime une publiciter
    const deletepub = async (id) =>{
            try{
            const pubRef = doc(db, 'images', id)
            await deleteDoc(pubRef);
            setpubtab(pubtab.filter(pub=> pub.id !== id));
            message.success('supprimer avec succes.');
            } catch(e) {
            message.error('une erreur est survenu');
            }
    }
    //fonction qui recupère toute les image de publiciter
    useEffect(() => {
    const getpub = async () => {
        setloading(true);
        try {
            const pubRef = collection(db,'images');
            const pubsnapshot = await getDocs(pubRef);
            const pubList = pubsnapshot.docs.map((image) =>({
                id: image.id,
                data: image.data(),
            }));
            setpubtab(pubList);
            console.log(pubList);
        }catch(error){
            console.log("une erreur c'est produite", error);
            setError(error.message);
        }
       
    }
    getpub();
    setloading(false);
}, []);
    return  ( loading?   <Spin spinning={loading} fullscreen /> : <div className="body-gl">
         
        <div className="bodypub">
            <div className="center">
            <div className="add ds">
              
            </div>
            {error && <div style={{ color: 'red' }}>{error} 
                   </div>}  
            </div>
            {
                pubtab && pubtab.map(item => (  
                <div className="card ds">  
                    <Popconfirm
                    title="Supprimer le Scan?"
                    description={
                      <div className="">
                        <button className="btnvalide" onClick={() => deletepub(item.id)}>supprimer</button>
                      </div>
                    }
                    showCancel={false}
                    
                   
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: 'red',
                        }}
                      />
                    }
                  > 
                     <div className="pmenu">   
                        <DeleteOutlined />
                     </div>    
                </Popconfirm>
                <Image.PreviewGroup >
                    <Image src={item.data.imageUrl}/>
                </Image.PreviewGroup>
               </div>))
            }
          
        </div>
    </div>)
}
export default Publicite;