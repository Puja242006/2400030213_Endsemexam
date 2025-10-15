import React, { useEffect, useState } from 'react'


const Calc = () => {
    const[value,setValue]=useState('');
  return (
    <div>
        <h1> <u> <mark> Simple Calculator</mark></u></h1>
      <form action="" style={{backgroundcolor:"greenyellow"}}>
        <fieldset>
        <div>
            <input type="text" value={value} />
        </div>
        <div>
            <input type="button" value="AC" onClick={e=>setValue('')}/> &nbsp;
            <input type="button" value="DEL" onClick={e=>setValue(value.slice(0,-1))}/> &nbsp;
            <input type="button" value="." onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="/" onClick={e=>setValue(value +e.target.value)}/>
        </div>
         <div>
            <input type="button" value="7" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="8" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="9" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="*" onClick={e=>setValue(value +e.target.value)}/>
        </div>
        <div>
            <input type="button" value="4" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="5" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="6" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="+" onClick={e=>setValue(value +e.target.value)}/>
        </div>
        <div>
            <input type="button" value="1" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="2" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="3" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="-" onClick={e=>setValue(value +e.target.value)}/>
        </div>
        <div>
            <input type="button" value="0" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="00" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="000" onClick={e=>setValue(value +e.target.value)}/> &nbsp;
            <input type="button" value="=" onClick={e=>setValue(e=>setValue(eval(value)))}/> &nbsp;
        </div>
</fieldset>
      </form>

    </div>
  )
}

export default Calc
