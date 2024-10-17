import React, { useState } from 'react';
import NameAvatar from './NameAvtar'; // Adjust the path as necessary

// import Card from './Card';


// import React from 'react';
import Card from './Card'; // Ensure you import your Card component
import zeroP from '../asset/NP.svg'; // Adjust the path if necessary
import oneP from '../asset/LP.svg'; // Adjust the path if necessary
import twoP from '../asset/MP.svg'; // Adjust the path if necessary
import threeP from '../asset/HP.svg'; // Adjust the path if necessary
import fourP from '../asset/UP.svg'; // Adjust the path if necessary
import backlog from "../asset/Backlog.svg"
import inProgress from "../asset/in-progress.svg"
import todo from "../asset/To-do.svg"
import ADD from "../asset/add.svg"
import threeDot from "../asset/3 dot menu.svg"
import fourPC from "../asset/UPC.svg" 




const Section = ({ group, cards, grouping }) => {
  console.log(cards, group)
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
};
  return (
    <div className='d-flex flex-column' style={{ width: '100%', padding: '20px' }}>
        <div className='mb-4'>
    {grouping == "priority"? <div className='d-flex justify-content-between'> 
            <div className='d-flex justify-content-start align-items-center'>
                <img className='my-auto' src={group == 0 ? zeroP: group == 1? oneP: group == 2? twoP : group == 3? threeP: fourPC} alt="Image description" />
                <p className='mb-0 ms-3 fw-bold'>{priorityLabels[group]}</p>
                <p className='mb-0 ms-3'>{cards.length}</p>
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <img className='my-auto' src={ADD}></img>
                <img className='my-auto ms-3' src={threeDot}></img>
            </div>

         </div>: grouping == "userName"? <div className='d-flex justify-content-between'>
         <div className='d-flex justify-content-start align-items-center'>
                <NameAvatar name= {group} />
                <p className='mb-0 ms-3 fw-bold'>{group}</p>
                <p className='mb-0 ms-3'>{cards.length}</p>
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <img className='my-auto' src={ADD}></img>
                <img className='my-auto ms-3' src={threeDot}></img>
            </div>


         </div>: grouping == "status"? 
         <div className='d-flex justify-content-between'>
            <div className='d-flex justify-content-start align-items-center'>
            <img className='' src={group == "Todo" ? todo: group == "Backlog"? backlog: inProgress} alt="Image description" />  
                <p className='mb-0 ms-3 fw-bold'>{group}</p>
                <p className='mb-0 ms-3'>{cards.length}</p>
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <img className='my-auto' src={ADD}></img>
                <img className='my-auto ms-3' src={threeDot}></img>
            </div>

         </div>: ""} 
        </div>    
      {/* <h4>{group}</h4> */}
      {cards.map((cardData, index) => (
        <Card key={index} cardData={cardData} />
      ))}
    </div>
  );
};

export default Section;
