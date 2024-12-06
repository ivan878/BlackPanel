import React , { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import user from '../assets/user.png';
import pub from '../assets/pub2.jpg';
import video from '../assets/video.png';
import scann from '../assets/scann.png';
import { db } from '../firebase';
import { collection, getDocs, } from 'firebase/firestore';
import Chart from '../components/chart';



function Dashboard() {
   //fonction qui compte les scans
   const [nombreScan, setnombreScan] = useState(0);

   useEffect(() => {
     const fetchDocCount = async () => {
       try {
         const querySnapshot = await getDocs(collection(db, "Scan"));
         setnombreScan(querySnapshot.size);
       } catch (error) {
         console.error("Error fetching document count: ", error);
       }
     };
 
     fetchDocCount();
   }, []);
     //fonction qui compte les User
     const [nombreUser, setnombreUser] = useState(0);

     useEffect(() => {
       const fetchUser = async () => {
         try {
           const querySnapshot = await getDocs(collection(db, "utilisateurs"));
           setnombreUser(querySnapshot.size);
         } catch (error) {
           console.error("Error fetching document count: ", error);
         }
       };
   
       fetchUser();
     }, []);
          //fonction qui compte les Pub
          const [nombrePub, setnombrePub] = useState(0);

          useEffect(() => {
            const fetchPub = async () => {
              try {
                const querySnapshot = await getDocs(collection(db, "images"));
                setnombrePub(querySnapshot.size);
              } catch (error) {
                console.error("Error fetching document count: ", error);
              }
            };
        
            fetchPub();
          }, []);
            //fonction qui compte les videos
            const [nombreVid, setnombreVid] = useState(0);

            useEffect(() => {
              const fetchVid = async () => {
                try {
                  const querySnapshot = await getDocs(collection(db, "video"));
                  setnombreVid(querySnapshot.size);
                } catch (error) {
                  console.error("Error fetching document count: ", error);
                }
              };
          
              fetchVid();
            }, []);
      
 
    return (
      <div className='dash-body'>
            <div className='row sp'>
              <div className='cart'>
                 <h3>Utilisateurs</h3>
                 <div className='row sp'>
                    <img src={user} alt="Logo Admin" className="image-ad" />
                    <h1 className='text'> {nombreUser} </h1>
                 </div>
              </div>
              <div className='cart'>
                 <h3>Scans</h3>
                 <div className='row sp'>
                    <img src={scann} alt="Logo Admin" className="image-ad" />
                    <h1 className='text-sc'> {nombreScan} </h1>
                 </div>
              </div>
              <div className='cart'>
                 <h3>Publicités</h3>
                 <div className='row sp'>
                    <img src={pub} alt="Logo Admin" className="image-ad" />
                    <h1 className='text-pub'> {nombrePub} </h1>
                 </div>
              </div>
              <div className='cart'>
                 <h3>Vidéos</h3>
                 <div className='row sp'>
                    <img src={video} alt="Logo Admin" className="image-ad" />
                    <h1 className='text-vid'>{nombreVid}</h1>
                 </div>
              </div>
            </div>
            <div className='cha row sp'>
                <div className='chart' id='id'>
                   <Chart />
                </div>
                 <div className='infos'>

                </div>
            </div>
      </div>
    );
};
export default Dashboard;