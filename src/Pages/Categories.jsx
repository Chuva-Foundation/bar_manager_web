import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddNewCategory from '../components/AddInfo/AddNewCategory';

const CATEGORIES_URL='/categories';
function Categories() {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  axios.get(CATEGORIES_URL).then((res) =>{
    const {name} = res.data;
    setCategories(res.data)
  });
}, []);

const listCategories = categories.map((category)=>
<div key={category.id}>
  <h2>{category.id}</h2>
  <span></span>
  <h2>{category.name}</h2><button>Edit</button><button>delete</button>
</div>
);
  return (
    <div>
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Create a Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <AddNewCategory/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
      {listCategories}
    </div>
  );
}

export default Categories
