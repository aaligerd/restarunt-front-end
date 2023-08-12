import React,{useState} from 'react'

function Avater({name}) {
  const [wInnerWidth, setWInnerWidth] = useState(window.innerWidth)
    let r=Math.random()*5;
    r=Math.round(r);
    
    window.addEventListener("resize",()=>{
      setWInnerWidth(window.innerWidth);
    });
  return (
    <div className='' >
        <img src={require('../assets/avaters/avater1.webp')} alt="" width="10%" height="100%" 
          style={wInnerWidth>=992?{display:"inline"}: {display:"none"}}
        />
        <p className='px-3' style={{display:"inline"}}>{name}</p>
    </div>
  )
}

export default Avater