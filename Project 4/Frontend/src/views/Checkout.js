import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LinearProgress, Card, CardContent, Typography, CardMedia, Grid, Button, IconButton, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { BsCartPlus } from "react-icons/bs";
import { Input } from "@mui/joy";

function ShoppingCart() {
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const [productItem, setProduct] = useState(null);
    const [quantities, setQuantities] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/product/${id}?populateImage=true`)
            .then((res) => {
                console.log("product :", res.data);
                setProduct(res.data);
                setIsReady(true);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setIsReady(true);
            });
    }, [id]);

    const handleIncreaseQuantity = () => {
        setQuantities((prevQuantities) => Math.min(prevQuantities + 1, productItem.pStock));   ////จำกัดไม่ให้มันเพิ่มเกินสต็อคจ้ะ
    };

    const handleDecreaseQuantity = (productId) => {
        setQuantities((prevQuantities) => Math.max(prevQuantities - 1, 1));
    };

    if (!isReady) {
        return <LinearProgress />;
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
            <Card key={productItem.id} className="w-full" style={{ marginBottom: '20px' }}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            image={productItem.pImage?.url}
                            alt={productItem.pImage?.url}
                            sx={{ height: 140, width: '100%', objectFit: 'contain', margin: 'auto' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <CardContent>
                            <Typography fontWeight="bold">
                                {productItem.pName}
                            </Typography>
                            <Typography>
                                รายละเอียด: {productItem.pDescription}
                            </Typography>
                            <Typography>
                                หมวดหมู่: {productItem.pCategory}
                            </Typography>
                            <Typography>
                                ราคา: {productItem.pPrice} บาท
                            </Typography>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Typography variant="body1" mr={2}>
                                    จำนวน
                                </Typography>
                                <IconButton onClick={handleDecreaseQuantity} size="small">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography component="span" sx={{ marginX: 2, minWidth: 40, textAlign: 'center' }}>
                                    {quantities}
                                </Typography>
                                <IconButton onClick={handleIncreaseQuantity} size="small">
                                    <AddIcon />
                                </IconButton>
                                <Typography variant="body1" ml={2}>
                                    มีสินค้าทั้งหมด {productItem.pStock} ชิ้น
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Button variant="outlined" color="primary" startIcon={<BsCartPlus />}>
                                    เพิ่มไปยังรถเข็น
                                </Button>
                                <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                                    ซื้อสินค้า
                                </Button>
                            </Box>
                        </CardContent>
                        
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default ShoppingCart;
