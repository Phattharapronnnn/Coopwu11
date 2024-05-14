import * as React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grid,
  LinearProgress
} from "@mui/material";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useState, useEffect } from "react";
import axios from 'axios';
import { BsCartPlus } from "react-icons/bs";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { Input } from "@mui/joy";


function CreateProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState([]);
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    getAllProduct();
    return () => { };
  }, []);

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
              <CardContent>
                <div>Search Box</div>
                <Input
                  placeholder='Input Some Search Word'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                  You Search <span className='text-blue-500'>{searchTerm}</span>
                </div>
              </CardContent>
            </Card>
            <div></div>
          </div>
    <Grid container spacing={"1px"}>
      {product.map((product, index) => (
        <Grid item key={index} xs={6} sm={4} md={4} lg={2} sx={{display:'flex', justifyContent: 'center'}}>
          <Card key={index} sx={{ length: 100, width: 250, marginTop: "5rem"}}>
          <Link to={`/Checkout/${product?._id}`} style={{ textDecoration: 'none',color: 'black' }}>
            <CardMedia
              component="img"
              sx={{ height: 200, width: 'auto', margin: 'auto'  }}
              image={product?.pImage?.url}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {product.pName}
              </Typography>
              
              <Typography  color="orange">
                ฿{product.pPrice}
                
              </Typography>
              
            </CardContent>
            </Link>

            <IconButton aria-label="add to favorites">
              <FavoriteBorderRoundedIcon />
            </IconButton>
            <IconButton aria-label="add to cart">
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
