import React from 'react';
import zeroP from '../asset/NP.svg'; // Adjust the path if necessary
import oneP from '../asset/LP.svg'; // Adjust the path if necessary
import twoP from '../asset/MP.svg'; // Adjust the path if necessary
import threeP from '../asset/HP.svg'; // Adjust the path if necessary
import fourP from '../asset/UP.svg'; // Adjust the path if necessary
import backlog from "../asset/Backlog.svg"
import inProgress from "../asset/in-progress.svg"
import todo from "../asset/To-do.svg"
import NameAvatar from './NameAvtar'; // Adjust the path as necessary



const Card = ({ cardData, grouping }) => {
  return (
    <div className='container' style={{backgroundColor:"white", padding: '10px', marginBottom: '20px', borderRadius: '10px', boxShadow: "0px 0px 14px 1px rgba(224,224,224,0.68)" }}>
      <div className='d-flex justify-content-between'>
        <p className='fs-6'>{cardData.id}</p>
        <NameAvatar name= {cardData.userName} />
      </div>
      <div className='d-flex align-items-center'>
        <img className='' src={cardData.status == "Todo" ? todo: cardData.status == "Backlog"? backlog: inProgress} alt="Image description" />
        <p style={{ wordWrap: "break-word", whiteSpace: "normal" }} className='fw-bold fs-6 mb-0 ms-2'>{cardData.title}</p>
      </div>
      <div className='d-flex justify-content-start align-items-center mt-3'>
        <img className='my-auto' src={cardData.priority == 0 ? zeroP: cardData.priority == 1? oneP: cardData.priority == 2? twoP : cardData.priority == 3? threeP: fourP} alt="Image description" />
        {/* {cardData.priority == 0 ? } */}
        <div className='ms-3 px-2 py-1 d-flex border justify-content-start align-items-center'>
          <div style={{backgroundColor:"#cfd0d1", width :"10px", height:"10px", borderRadius : "10px"}}>
          </div>
            <p style={{color : "grey"}} className='mb-0 ms-2'>{cardData.tag[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
