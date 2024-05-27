import * as React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grid,
  LinearProgress,
  Button
} from "@mui/material";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useState, useEffect } from "react";
import axios from 'axios';
import { BsCartPlus } from "react-icons/bs";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { Input } from "@mui/joy";
import _ from 'lodash';

function CreateProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [cart, setCart] = useState([]);
  const [rerender, setRerender] = useState(false)

  const getAllProduct = () => {
    setIsReady(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}/product`)
      .then((res) => {
        setProduct(res?.data?.rows);
        setIsReady(true);
        console.log("Product ", res?.data?.rows);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };
  console.log("cart", cart)



  useEffect(() => {
    getAllProduct();
    return () => { };
  }, []);
  const filteredProducts = product.filter((p) =>
    p.pName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isReady) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className='lg:w-3/4'>
        <Card>
          <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <div>Search Box</div> */}
            <Input
              placeholder='Input Some Search Word'
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 4, marginRight: '8px' }}
            />


            <Link to='/Cart'>
              <IconButton aria-label="add to cart" >
                <BsCartPlus />
              </IconButton>
            </Link>
          </CardContent>
          <div>
            You Search <span className='text-blue-500'>{searchTerm}</span>
          </div>
        </Card>
        <div></div>
      </div>
      <div>
        <div>สินค้าในตะกร้า</div>
        {_.map(cart, (product, index) => (
          <div key={index}>
            {product?.product?.pName}{' '}
            <Button

              onClick={() => {
                cart.splice(index, 1);
                setCart([...cart]);
                setRerender(!rerender);
              }}>
              ลบ
            </Button>
          </div>
        ))}
      </div>
      <Grid container spacing={"1px"}>
        {filteredProducts.map((product, index) => (
          <Grid item key={index} xs={6} sm={4} md={4} lg={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card key={index} sx={{ length: 100, width: 250, marginTop: "5rem" }}>
              <Link to={`/Checkout/${product?._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, width: 'auto', margin: 'auto' }}
                  image={product?.pImage?.url}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.pName}
                  </Typography>

                  <Typography color="orange">
                    ฿{product.pPrice}

                  </Typography>

                </CardContent>
              </Link>

              <IconButton aria-label="add to favorites">
                <FavoriteBorderRoundedIcon />
              </IconButton>
              <IconButton
                size="sm"
                color="primary"
                onClick={() => {
                  const selectedProduct = _.find(cart, productProductInCard => productProductInCard?.product?._id === product?._id)
                  if (selectedProduct) {
                    selectedProduct.quantity = selectedProduct.quantity + 1
                  }
                  else {
                    cart.push({ product: product, quantity: 1 })
                  }

                  setCart(cart)
                  console.log(cart)
                  setRerender(!rerender)
                }}>
                เพิ่ม
                <BsCartPlus />
              </IconButton>

              <Link to={`/products/edit/${product?._id}`}>
                <IconButton aria-label="add to cart">
                  <EditIcon />
                </IconButton>
              </Link>

            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CreateProduct;
