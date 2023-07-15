import React from 'react';
import '../css/SingleRowComponent.css';

function SingleRowComponent({fcolor,ftext}) {
  return (
    <td id='tblLastCol' style={{color:fcolor}} >
        {ftext} 
        <button id='orderStatusChangeBtn'>i</button>
     </td>
  )
}

export default SingleRowComponent