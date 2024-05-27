import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  LinearProgress,
  Table,
} from "@mui/joy";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";

function CartProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  

  const getAllProduct = () => {
    setIsReady(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}/product`)
      .then((res) => {
        setProducts(res?.data?.rows);
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

  const handleDeleteProduct = (userId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/product/${userId}`)
      .then((res) => {
        getAllProduct();
      })
      .catch((error) => {
        alert(error?.message);
        console.error("Error", error?.message);
      });
  };

  if (!isReady) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div>
      <div className='min-h-screen'>
        <div className='flex justify-center  flex-wrap'>
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
            <div>
              <h3 className='font-bold'>รถเข็น</h3>
              <Table>
                <thead>
                  <tr>
                    <th>ลำดับที่</th>
                    <th></th>
                    <th>สินค้า</th>
                    <th>ราคา</th>
                    <th>หมวดหมู่สินค้า</th>
                    <th>คลังสินค้า</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                {_.map(products, (eachProduct, index) => (
                    <tr key={eachProduct._id}>
                      <td>{index + 1}</td>
                      <td>
                        {eachProduct?.pImage?.url ? (
                          <img
                            src={eachProduct.pImage.url}
                            alt={eachProduct.pName}
                            style={{ width: "50px", height: "50px" }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{eachProduct?.pName}</td>
                      <td>{eachProduct?.pPrice}</td>
                      <td>{eachProduct?.pCategory}</td>
                      <td>{eachProduct?.pStock}</td>
                      <td>
                      <Button
                        color='danger'
                        onClick={() => handleDeleteProduct(eachProduct?._id)}
                      >
                        ลบ
                      </Button>
                      
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
