import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
const PRODUCTS_URL="/products";
const SALES_URL="/sales"
const CARD_URL="/cards"
const Sales = () => {
  const [product_id, setProduct_ID] = useState("")
  const [card_id, setCard_ID] = useState("a6dd7cf1-9e1b-4c75-a181-17bf272ca443");
  const[errMsg, setErrMsg] =useState("");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState({});

  const AddToCardSubmit = (product) =>{ 
    const {id} = product
    console.log(sales[id]);
    let amount = sales[id] ? (sales[id] + 1) : ( 1 );
    const salesToUpate = {...sales, [id]:amount}
    setSales(salesToUpate)
    console.log(salesToUpate);
    
  };
  useEffect(() => {
    axios.get(PRODUCTS_URL).then((res) => {
      const {id, name} = res.data;
      setProducts(res.data);
    });
  }, []);

  const listItems = products.map((product)=>
    <div className="card " key={product.id}>
      <div className='card_img'>
      <img src={product.thumb} />
      </div>
    <div className='card_header'>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}<span>Esc</span></p>
      <button onClick={() => {AddToCardSubmit(product)}}>Add to Card</button>
    </div>
    </div> 
    );

   const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post(SALES_URL, {sales, card_id})  
        console.log(response.data);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Bad Request");
        } else {
          setErrMsg("Action Failed");
        }
      }
    }
return(
  <>
  <div className='main_content'>
    <h3>List of Products</h3>
    {listItems}
  </div>
  <div>
    
  </div>
  <button onClick={handleSubmit}>Confirm Purchases</button>
  </>
)
};
export default Sales
