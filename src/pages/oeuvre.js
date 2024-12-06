import React, { useState, useEffect  } from "react";
import { collection, getDocs,doc,  addDoc ,deleteDoc } from 'firebase/firestore';
import { db,storage, } from '../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,

} from "firebase/storage";

import { Spin ,Image, Modal,Button,   Select, Form, Switch,  
  Input,notification,Popconfirm ,message
 } from 'antd';
 import { DeleteOutlined ,QuestionCircleOutlined } from '@ant-design/icons';

import '../styles/oeuvre.css';

function Oeuvre () {
    const [scanData, setScanData] = useState([]);
    const [loading, setloading] = React.useState(true);
    const [showmodal, setshowmodal] = React.useState(false);
    //state du formulaire d'ajoute de scan
    const [certifScan, setcertifScan] = React.useState(false);
    const [nameScan, setnameScan] = useState();
    const [descScan, setdescScan] = useState();
    const [editeurScan, setediteurScan] = useState();
    const [imageScan, setimageScan] = useState();
    const [pdfScan, setpdfScan] = useState(null);
    const [typeScan, settypeScan] = useState(null);
    //valeur booleen du formulaire
    const handleChange = (value) => {
      settypeScan(value);
    };
    //fonction pour sauvegardé les scans
    const uploadFileAndGetURL = async (imageScan) => {
      const storageRef = ref(storage, `ImageScan/${imageScan.name}`);
      const snapshot = await uploadBytes(storageRef, imageScan);
      const url = await getDownloadURL(snapshot.ref);
      setimageScan(url);
      return url;
    };



    const handleSubmit = async () => {
    setloading(true);
    setshowmodal(false)
     const imageFile = document.getElementById('Image').files[0];
     const pdfFile = document.getElementById('pdf').files[0];
     if (!imageFile || !imageScan) {
      console.error("No image file selected");
      alert("Please select an image file");
      return;
    }
  
    if (!pdfFile || !pdfScan) {
      console.error("No PDF file selected");
      alert("Please select a PDF file");
      return;
    }
      try {
        const [imgUrl, pdflink] = await Promise.all([
          uploadFileAndGetURL(imageFile),
          uploadFileAndGetURL(pdfFile)
        ]);
        if (imgUrl == null) return;
        if (pdflink == null) return;
        const imageUrl = await uploadFileAndGetURL(imageFile);
        const pdfUrl = await uploadFileAndGetURL(pdfFile);
      
        console.log('link img',imageUrl + 'link pdf', pdfUrl);
    
        const data = {
              imageUrl: imgUrl,
              pdfFile: pdflink,
              booleanValue: certifScan,
              name: nameScan,
              editeur: editeurScan,
              description: descScan,
              type: typeScan,
              
        };
        // const addDataToFirestore = async (data) => {
        //   try {
        //     setloading(true);
        //     const docRef = await addDoc(collection(db, 'Scan'), data);
        //     console.log("Document written with ID: ", docRef.id);
        //   } catch (e) {
        //     console.error("Error adding document: ", e);
        //   }
          
      
    
        // };
    
        await addDoc(collection(db, "Scan"), data);
       //fonction pour activer la notification de success
        notification.success({
          message: 'Opération effectuer avec succes',
          description: 'mise en ligne du scan ',
        });
     
       
      } catch (e) {
        console.error("Error handling file upload: ", e);
          //fonction pour activer la notification d'erreur
        notification.error({
          message: 'Oups',
          description: 'une erreur est survenu vérifier votre connexion internet',
        });
      }
       setloading(false);
     
    };
    // const uploadScan = async (data) => {
    //   try {
    //     setloading(true);

           // Sauvegarde du PDF
           // const refPdf = storage.ref().child('documents/' + pdfScan.name);
            // const refPdf = collection(db, "documents/" + pdfScan.name);
            // await refPdf.put(pdfScan);
            // const pdfUrl = await refPdf.getDownloadUrl();
            // Sauvegarde de l'image
            // if (imageScan == null) return;
            // const imageRef = ref(storage, `images/${imageScan.name}`);
            // const urlimg = uploadBytes(imageRef, imageScan).then((snapshot) => {
            //  getDownloadURL(snapshot.ref).then((url) => {
            //     setimgScan((prev) => [...prev, url]);
            //   });
            // });
            //const imageRef = storage.ref().child('images/Scan' + imageScan.name);
            // await imageRef.put(imageScan);
            // const imageUrl = await imageRef.getDownloadUrl();

            
          //  const docRef = await addDoc(myCollection,({
          //   imageScan: urlimg,
          //   pdfFile: pdfScan,
          //   booleanValue: certif,
          //   name: name,
          //   editeur: editeur,
          //   description: description,
          //   type: type
          // }) );
            // await firestore.collection('Scan').add({
            //   imageUrl: getDownloadURL,
            //   pdfFile: 'pdfUrl',
            //   booleanValue: certif,
            //   name: name,
            //   editeur: editeur,
            //   description: description,
            //   type: type
            // });
      // }catch(e) {
      //   console.log("une erreur est survenu", e)
      // }
     // console.log('les datas sont :',certif,imageScan,name,description,editeur,pdfScan,type);
      
    //   setshowmodal(false);
    //   setloading(false);
    // }
    //fonction qui supprimer un scan
    const deleteScan = async (id) => {
      try {
        const scanDocRef = doc(db, 'Scan', id);
        await deleteDoc(scanDocRef);
        setScanData(scanData.filter(scan => scan.id !== id));
        console.log('Document successfully deleted!');
        message.success('supprimer avec succes.');
      } catch (error) {
        console.error('Error removing document: ', error);
        message.error('une erreur est survenu');
      }
    };
    //fonction qui recupère tout les scan
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchScans = async () => {
           
          try {
            const scansRef = collection(db,'Scan');
            const scansSnapshot = await getDocs(scansRef);
    
            const scanData = scansSnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }));
    
            setScanData(scanData);
            console.log('les datas', setScanData);
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setError(error.message);
          }
        };
       
    
        fetchScans();
        setloading(false);
      }, []);
    return ( loading?   <Spin spinning={loading} fullscreen /> :
   <div className="body">
    <div className="alt-el">
    <div className="mgl">
      <button className="btnadd1" onClick={()=>setshowmodal(true)}>Ajouter</button>
      {/* <Button className="btnadd1" onClick={()=>setshowmodal(true)} type="primary">Ajouter</Button> */}
    </div>
     
   <div className="body-card">
  
     
          {error && <div style={{ color: 'red' }}>Erreur : {error}</div>}
          <Spin spinning={loading} fullscreen />
        {
         scanData &&  scanData.map(scan=> (
            <div className="card ">
               <Popconfirm
                    title="Supprimer le Scan?"
                    description={
                      <div className="">
                        <button className="btnvalide" onClick={() => deleteScan(scan.id)}>supprimer</button>
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
                     <div className="smenu">   
                        <DeleteOutlined />
                     </div>    
                </Popconfirm>
             
              {/* <p>id : {scan.id}</p>
                <p>Description : {scan.data.name}</p> */}
                <Image.PreviewGroup >
                     <Image src={scan.data.imageUrl}/>
                </Image.PreviewGroup>
             </div>
             
           ))
        }   
                <Modal className="mod" footer={null} closeIcon={true} title="AJOUTER UN SCAN" open={showmodal}  onCancel={()=>setshowmodal(false)}>
                    
                 <div className="Container">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className='form-group row '>
                          <Input
                            className="mput"
                            id="Image"
                            label="Image"
                            title="image"
                            accept="image/png,image/jpeg"
                            type="file"
                            onChange={(e) => {
                              setimageScan(e.target.files[0]);
                            }}
                          />                     
                          {/* <Form.Item label="Affiche" valuePropName="fileList" >
                            <Upload action="/upload.do" listType="picture-card"
                            defaultFileList={imageScan}
                            onChange={handleImageChange}
                            >
                              <button
                                style={{
                                  border: 0,
                                  background: 'none',
                                }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div
                                  style={{
                                    marginTop: 8,
                                  }}
                                >
                                 upload
                                </div>
                              </button>
                            </Upload>
                          </Form.Item> */}
                          <Input
                            id="pdf"
                            type="file"
                            title="pdf file "
                            accept=".pdf"
                            onChange={(e) => {
                              setpdfScan(e.target.files[0]);
                            }}
                          />
                          {/* <Form.Item label="pdf" valuePropName="fileList" getValueFromEvent={pdfScan} >
                            <Upload action="/upload.do" listType="picture-card"
                              customRequest={customRequest}
                            maxCount={1}
                            onChange={handleChangepdf}
                            fileList={pdfScan ? [pdfScan] : []}
                            >
                              <button
                                style={{
                                  border: 0,
                                  background: 'none',
                                }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div
                                  style={{
                                    marginTop: 8,
                                  }}
                                >
                                 upload
                                </div>
                              </button>
                            </Upload>
                          </Form.Item> */}
                          </div>
                      
                              <div className='form-group'>
                                  <label className="fname">Certifier?</label>
                                  <Form.Item label="certifier" valuePropName="checked">
                                    <Switch defaultChecked={certifScan} onChange={e=>setcertifScan(true)}  />
                                  </Form.Item>
                               </div>
                               <div className='form-group'>
                                  <label className="fname">nom de l'éditeur</label>
                                  <Input placeholder="Basic usage" value={editeurScan} onChange={e=>setediteurScan(e.currentTarget.value)} />
                               </div>
                               <div className='form-group'>
                                  <label className="fname">nom du scan</label>
                                  <Input placeholder="Basic usage" value={nameScan} onChange={e=>setnameScan(e.currentTarget.value)} />
                               </div>
                               <div className='form-group'>
                                  <label className="fname">description</label>
                                  <Input placeholder="Basic usage" value={descScan} onChange={e=>setdescScan(e.currentTarget.value)} />
                               </div>
                               <Form.Item label="Type">
                                <Select defaultValue={typeScan} onChange={handleChange}>
                                  <Select.Option value="action">action</Select.Option>
                                  <Select.Option value="aventure">aventure</Select.Option>
                                  <Select.Option value="romantic">romantic</Select.Option>
                                  <Select.Option value="comique">comique</Select.Option>
                                  <Select.Option value="tragique">tragique</Select.Option>
                                  <Select.Option value="fun">fun</Select.Option>
                                </Select>
                              </Form.Item>
                              <div className='form-group'>
                              
                                  <Button type="primary"  className='btn1 btnl' onClick={ () =>handleSubmit()}>poster</Button>
                              </div>
                          </form>
                      </div>
                </Modal>
                </div>
                </div>
        </div>)
};
export default Oeuvre;