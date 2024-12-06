import React, { useState, useEffect } from "react";
import { collection, deleteDoc, getDocs , doc,serverTimestamp,addDoc} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
  
  } from "firebase/storage";
import '../styles/video.css';
import { db,storage, } from '../firebase';
import { Spin ,message,Popconfirm,Input,Modal,Button,notification} from 'antd';
import { DeleteOutlined ,QuestionCircleOutlined,FileAddOutlined } from '@ant-design/icons';
import { Player } from 'video-react';


function Video () {
    const [loading, setloading] = React.useState(false);
    const [error, setError] = useState(null);
    const [vid, setvid] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //pick vidéo upload and get url
  const uploadFileAndGetURL = async (videoUrl) => {
    const storageRef = ref(storage, `videoUrl/${videoUrl.name}`);
    const snapshot = await uploadBytes(storageRef, videoUrl);
    const url = await getDownloadURL(snapshot.ref);
    setVideoUrl(url);
    return url;
  };
  const handleSubmit = async (e) => {
    setloading(true);
    handleOk();
    const vidUrl = document.getElementById('video').files[0];
    if (!vidUrl) {
        console.error("No  file selected");
        alert("Please select an  file");
        return;
      }
      try {
        // e.preventDefault();
        const [videoUrl] = await Promise.all([
            uploadFileAndGetURL(vidUrl),
         
          ]);
        await addVideo(title, description, videoUrl);
       
     
      } catch(e){
      
      }
      setloading(false);
  };
    //fonction qui supprime une video
    const deletevideo = async (id) =>{
            try{
            const pubRef = doc(db, 'video', id)
            await deleteDoc(pubRef);
            setvid(vid.filter(video=> video.id !== id));
            message.success('supprimer avec succes.');
            } catch(e) {
            message.error('une erreur est survenu');
            }
    }
    //fonction qui ajoute une video
    const addVideo = async (title, description, videoUrl) => {
      setloading(true);
        try {
          const docRef = await addDoc(collection(db, 'video'), {
            title: title,
            description: description,
            videoUrl: videoUrl,
            createdAt: serverTimestamp()
          });
          console.log('Video added with ID:', docRef.id);
          notification.success({
            message: 'Success',
            description: 'Vidéo ajouter avec succès',
          });
        } catch (error) {
          console.error('Error adding video:', error);
          notification.error({
            message: 'Success',
            description: 'Vidéo ajouter avec succès',
          });
        }
        setloading(false);
      };
   // fonction qui recupère toute les videos 
    useEffect(() => {
    const getVideo = async () => {
        try {
            const pubRef = collection(db,'video');
            const pubsnapshot = await getDocs(pubRef);
            const listeVideo = pubsnapshot.docs.map((video) =>({
                id: video.id,
                data: video.data(),
            }));
            setvid(listeVideo);
            console.log(listeVideo);
        }catch(error){
            console.log("une erreur c'est produite", error);
            setError(error.message);
        }
    }
    getVideo();

}, []);
    return  ( loading?   <Spin spinning={loading} fullscreen /> : <div className="body-gl">
         
        <div className="bodyvid">
            <div className="center">
            <div className="add ds" onClick={showModal}>
              
            </div>
            {error && <div style={{ color: 'red' }}>{error} 
                   </div>}  
            </div>
            {
                vid && vid.map(item => (  
                <div className="card ds">  
                    <Popconfirm
                    title="Supprimer le Scan?"
                    description={
                      <div className="">
                        
                        <button className="btnvalide" onClick={() => deletevideo(item.id)}>supprimer</button>
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
                <Player
                
                 className="vid">
                  <source className="vid" src={item.data.videoUrl} />
                </Player>
               </div>))
            } 
          
        </div>
        <Modal 
        title="Ajouter une vidéo"
         open={isModalOpen}
          onOk={(e) => handleSubmit()}
           footer={<div></div>}
           onCancel={handleCancel}>
        <form onSubmit={handleSubmit}>
        <div className='form-group'>
           <label className="fname">Titre</label>
             <Input placeholder="nom"  value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='form-group'>
           <label className="fname">Description</label>
             <Input placeholder="Description"  value={description}onChange={(e) => setDescription(e.target.value)}/>
        </div>
        {/* <div>
          <label>
            Titre :
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div> */}
        {/* <div>
          <label>
            Description :
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div> */}
        <div>
          <label>
            Fichier de la vidéo :
            <Input
                         
                         id="video"
                         type="file"
                         accept=".mp4"
                         onChange={(e) => {
                            setVideoUrl(e.target.files[0]);
                         }}
                       />
            <div className='form-group'>
                <button className="btnadd1" onClick={(e) => handleSubmit()}>Ajouter</button>
            </div>
            {/* <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            /> */}
          </label>
        </div>
       
      </form>
      </Modal>
    </div>)
}
export default Video;