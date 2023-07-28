import React from 'react'

function Avater({name}) {
    let r=Math.random()*5;
    r=Math.round(r);

  return (
    <div className='' >
        <img src={require('../assets/avaters/avater1.webp')} alt="" width="10%" height="100%" style={{display:"inline"}} />
        <p className='px-3' style={{display:"inline"}}>{name}</p>
    </div>
  )
}

export default Avater