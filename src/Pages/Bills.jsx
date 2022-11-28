import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import Popup from '../components/Popup';
const BILLS_URL = "/bills"

function Bills() {
const[getBills, setGetBills] = useState("")
const [visibility, setVisibility] = useState(false)
const [errMsg, setErrMsg] = useState("");
const [card_id, setCard_id] = useState([]);
    


useEffect(()=>{
 axios.get(BILLS_URL).then((res)=>{
        const{card_id, id} = res.data
        setGetBills.push(res.data)
    }); 
   }, []);

const listBills = getBills.map((bill)=>
<div key={bill.id}>{bill.id}</div>)

const handleSubmit = () => {
  try{
  const response = axios.post(BILLS_URL, {card_id
  });
  console.log(response.data);
  console.log(JSON.stringify(response));
} catch (err) {
  if (!err?.response) {
    setErrMsg("No Server Response");
  } else if (err.response?.status === 404) {
    setErrMsg("Card Not Found");
  } else {
    setErrMsg("Action Failed");
  }
}
}

const popupCloseHandler = (e) =>{
  setVisibility(e)
}



  return (
    <div>
      <h1><button onClick={(e) => setVisibility(!visibility)}>Insert Card</button></h1>
      <Popup
        onClose={popupCloseHandler}
        show={visibility}
        title="Insert a card ID">
      <input required value={card_id}></input>
      <button onSubmit={handleSubmit}>submit</button>
      </Popup>
    <div>
      {listBills}
    </div>
    </div>
  )
}

export default Bills
