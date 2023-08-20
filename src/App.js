import { useState } from 'react';
import './App.css';
import CountTimer from './CountTimer';

function App() {
  const [listCT, setListCT] = useState([<CountTimer key="d" tt={1}/>])
  
  const handleDelete = (id) => {
    const newlistCT = listCT
    newlistCT.splice(id, 1)
    setListCT([...newlistCT])
  }
  
  
  const handleClick = () => {
    //setListCT(listCT.concat(<CountTimer key={listCT.length}/>))
    setListCT([...listCT, <CountTimer key={listCT.length} tt={listCT.length+1} btn={()=>handleDelete(listCT.length+1)}/>])
  }
  
  return (
    <div style={{width:'50%',margin:'0 auto'}}>


      {listCT.map((a, index) => {

        
        return (
          <div
            className='div_timercount'
            key={index}
            style={{margin:'0 auto',position:'relative'}}
          >
            {a }
            <span className='btn_remove'>
              <button
                
                onClick={() => handleDelete(index)}
                style={{
                   display: 1 > index ? "none" : "inherit",
                   position:'absolute',
                   bottom:'55px',right:'6px',background:'none',fontSize:'16px',
                   color:'red',
                   outline:'none',
                   border:'0'

                  }}
                   
              >Remove &times;
              </button>
            </span>
          </div>

        )




      }
      )}
      <button 
        style={{
          background:'none',
          fontSize:'18px',
          color: '#556bb5',
          
          border:'0',
          display:'block',
          margin:'10px 0 0 0',

        }}
      onClick={handleClick}>+ Add Another Timer</button>
     
    </div>
  );
}

export default App;
