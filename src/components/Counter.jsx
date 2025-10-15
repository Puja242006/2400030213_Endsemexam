import React, { useState } from 'react'


const Counter = () => {
    const[count,setCount]=useState(0);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f0f0f0'
    }}>
       
        <form action="" style ={{backgroundColor:"white"}}>
            <fieldset style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '5px' }}>

<h1><u><mark>Simple Counter</mark></u></h1>
      <h1>{count}</h1>

      <input type="button" onClick={()=>setCount(count+1)} value="ADD"style={{ backgroundColor: 'pink', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}/>&nbsp; &nbsp;
      <input type="button" onClick={()=>setCount(count-1)} value="SUB"  style={{ backgroundColor: 'pink', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
/>&nbsp;<br />
      
      <input type="button" onClick={()=>setCount(0)} value="Reset"style={{ backgroundColor: 'grey', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}/>
 
 </fieldset>
 </form>
      
    </div>
  )
}

export default Counter 