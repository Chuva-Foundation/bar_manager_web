import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddProduct from '../components/AddInfo/AddProduct';

import { Link } from 'react-router-dom';
const PRODUCTS_URL=("/products");

const Products = () => {
    const [products, setProducts] = useState([]);
    const [product_id, setProduct_ID] = useState("")
    const [errMsg, setErrMsg] = useState("");
    
    useEffect(() => {
        axios.get(PRODUCTS_URL).then((res) => {
          const {id, name} = res.data;
          setProducts(res.data);
        });
      }, []);
      const handleDelete = async (e) => {
      
      const product_delete = e.target.value
      try {
        const response = await axios.delete(PRODUCTS_URL + "/" + product_delete)
        const res = await axios.get(PRODUCTS_URL)
        console.log("get", res.data)
        setProducts(res.data);
        console.log(response.data)
      } catch (err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Bad Request");
    } else {
      setErrMsg("Action Failed");
};
};
}
      const listItems = products.map((product)=>
        <div  key={product.id}>
          <div className='card_img'>
          <img src={product.thumb} />
          </div>
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}<span>Esc</span></p>
        </div>
        <Link to ={`EditProduct/${product.id}`}>edit product</Link> 
        <button value={product.id} onClick={handleDelete}>delete product</button>
        </div> 
        );
        
    
  return (
    <>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add a Product</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <AddProduct/>
        </AccordionDetails>
      </Accordion>

    <div>
      {listItems}
    </div>
    </>
  )
}

export default Products
