import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Input, LinearProgress } from "@mui/joy";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useParams } from "react-router";


function EditProduct() {
  const [isReady, setIsReady] = useState(true);
  const { control, handleSubmit, setValue } = useForm();
  // const [open , setOpen] =  useState(false);

  const {id} = useParams();
 
  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then((res) => {
       const productdata = res.data;
       setValue('pImage',productdata.pImage);
       setValue('pName',productdata.pName);
       setValue('pPrice',productdata.pPrice);
       setValue('pDescription',productdata.pDescription);
       setValue('pCategory',productdata.pCategory);
       setValue('pStock',productdata.pStock);
      })
      .catch((error) => {
        setIsReady(true);
        control.error("Error", error)
      });
    }
  }, [id,setValue]);



  const handleEditProduct = (data) => {
    console.log("data", data);
    setIsReady(false);
    axios
      .put(`${process.env.REACT_APP_API_URL}/product/${id}`, data)
      .then((res) => {
        axios.get(`${process.env.REACT_APP_API_URL}/product`).then((res) => {
          setIsReady(true);
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        });
        
      })
      .catch((error) => {
        setIsReady(true);
      });
  };

  const pCategory = [
    { label: 'เสื้อผ้า', id: 1 },
    { label: 'เครื่องใช้ไฟฟ้า', id: 2 },
    { label: 'ความงามและของใช้ส่วนตัว', id: 3 },
    { label: 'อุปกรณ์ไอที', id: 4 },
    { label: 'ผลิตภัณฑ์เพื่อสุขภาพ', id: 5 },
    { label: 'อาหารและเครื่องดื่ม', id: 6 },
    { label: 'สัตว์เลี้ยง', id: 7 },
    { label: 'รองเท้า', id: 8 },
    { label: 'ตั๋วและบัตรกำนัล', id: 9 },
    { label: 'ยานยนต์', id: 10 },
    { label: 'เครื่องเขียน และหนังสือ', id: 11 },
    { label: 'เครื่องใช้ในบ้าน', id: 12 },
    { label: 'กีฬาและกิจกรรมกลางแจ้ง', id: 13 },
    { label: 'กระเป๋า', id: 14 }
  ];

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
          <div className='lg:w-3/4 '>
            <br></br>
            <div className='my-1 font-bold text-lg'>เพิ่มสินค้าใหม่</div>
            <Card>
              <CardContent>

                <form onSubmit={handleSubmit(handleEditProduct)}>
                  <div>ชื่อสินค้า</div>
                  <Controller
                    name='pName'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='ชื่อสินค้า' />
                    )}
                  />
                  <div>ราคา</div>
                  <Controller
                    name='pPrice'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='ราคา' />
                    )}
                  />
                  <div>
                    <div>รายละเอียดสินค้า</div>
                    <Controller
                      name='pDescription'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder='รายละเอียดสินค้า' />
                      )}
                    />
                    <div>หมวดหมู่</div>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={pCategory}
                      onChange={(event, newValue) => {
                        setValue("pCategory", newValue ? newValue.label : "");
                      }}
                      renderInput={(params) => <TextField {...params} label="หมวดหมู่สินค้า" />}
                    />
                    <div>คลังสินค้า</div>
                    <Controller
                      name='pStock'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder='ปริมาณ' />
                      )}
                    />
                    <div>อัพโหลดรูปภาพ</div>
                    <Controller
                      name='pImage'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder='อัพโหลด' />
                      )}
                    />
                    
                    <br></br>
                    <Button type='submit'>บันทึก</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          {/* <div className='lg:w-3/4'>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
