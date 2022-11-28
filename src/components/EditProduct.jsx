import react, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import Form from "react-bootstrap/Form";
import { Button } from "../Styled.Components";

const CATEGORIES_URL = "/categories";
const ADDPRODUCT_URL = "/products";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const productRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    axios.get(CATEGORIES_URL).then((res) => {
      setCategories(res.data);

    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productCategory);

    try {
      const response = await axios.put(ADDPRODUCT_URL, {
        name: productName,
        category_id: productCategory,
        price: productPrice,
        description: productDescription,
      });
      console.log(response?.data);
      console.log(JSON.stringify(response));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Action Failed");
      }
    }
  };

  return (
    <>
      <h3>Edit product Product</h3>
      <br></br>
      <form onSubmit={handleSubmit}>

        <div>
          <label>product Name</label>
          <br></br>
          <input
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="enter a new name"
          ></input>
        </div>
        <br></br>
        <div>
          <label>product category</label>
          <br></br>
          <Form.Select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            {categories.map((category) => {
             return  <option key={category.id} value={category.id}>{category.name}</option>}
            )}
          </Form.Select>
        </div>
        <br></br>
        <div>
          <label>product Description</label>
          <br></br>
          <input
            required
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="enter a description"
          ></input>
        </div>
        <br></br>
        <div>
          <label>product price</label>
          <br></br>
          <input
            required
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="enter a new price"
          ></input>
        </div>
        <br></br>
        <Button>Add the Edited Product</Button>
      </form>
    </>
  );
};
export default EditProduct;
