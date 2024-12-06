import React from "react";
import { Line } from  "react-chartjs-2" ; 
import { Chart  as  ChartJS , CategoryScale , LinearScale , PointElement , LineElement , Title , Tooltip , Legend , Filler } from  "chart.js" ; 

ChartJS. register ( CategoryScale , LinearScale , PointElement , LineElement , Title , Tooltip , Legend , Filler ); 

const  LineGraph = ( ) => { 
  const data = {
    
    labels: ['jan',"Fev","Mar","Avr","Mai","Juin","Juil","Aout","Sept","Oct","Nov","Dec"],
    datasets:[{
      label : "Dernière Inscription" , 
      data: [8,1,32,12,18,7,13,0,1,17],
      backgroundColor: 'transparent',
      borderColor: 'red',
     
    }]
  };
  const option =[

  ]
  const sampleData = [ 43 , 40 , 50 , 40 , 70 , 40 , 45 , 33 , 40 , 60 , 40 , 50 , 36 ]; 


  const options = { 
    échelles : { 
      x : { 
        grille : { 
          affichage : true , 
        }, 
        étiquettes : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 ] , 
        ticks : { 
          couleur : "red" , 
          police : { 
            famille :"Nunito" , 
            taille : 12 , 
          }, 
        }, 
      }, 
      y : { 
        grille : { 
          display : true , 
        }, 
        border : { 
          display : true , 
        }, 
        min : 0 , 
        max : 80 , 
        ticks : { 
          stepSize : 10 , 
          couleur : "green" , 
          police : { 
            famille : "Nunito" , 
            taille : 12 , 
          }, } 
        , 
      }, 
    }, 
    sustainAspectRatio : false , 
    responsive : true , 
    plugins : { 
      légende : { 
        display : false , 
      }, 
      titre : { 
        affichage : false , 
      }, 
    }, 
  } ; 

  const graphStyle = { 
    minHeight : "20rem" , 
    maxWidth : "750px" , 
    backgroundColor: '#001529',
    width : "100%" , 
    border : "1px solid #C4C4C4" , 
    borderRadius : "0.375rem" , 
    padding : "0.5rem" , 
  }; 

  return ( 
    <div style={graphStyle}> 
      <Line id="home" options={options} data={data} /> 
    </div> 
  ); 
} ; 
export default LineGraph;