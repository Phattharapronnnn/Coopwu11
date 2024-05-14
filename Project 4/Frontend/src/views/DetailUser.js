import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/joy";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";

function DetailUser() {
    const params = useParams();
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState({});

    console.log("params", params);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/${params.id}`)
            .then((res) => {
                setData(res.data);
                setIsReady(true);
                console.log("data", data);
            });
        return () => { };
    }, [params]);

    if (!isReady) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }   ///โหลด

        return (
            <Card className="w-96">
              
                 <Typography variant="h1" color="blue-gray" className="mb-2">
                  Detail User
                </Typography>
              <CardHeader floated={false} className="h-80">
                <img src="https://cdn-icons-png.freepik.com/256/3177/3177440.png?semt=ais_hybrid" alt="profile-picture" />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                {data.title}{data.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                แผนก : {data.department}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                อายุ : {data.age}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                เบอร์โทรศัพท์ : {data.tel}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                ที่อยู่ :  {data.address}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                  <Typography
                    as="a"
                    href="#facebook"
                    variant="lead"
                    color="blue"
                    textGradient
                  >
                    <i className="fab fa-facebook" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography
                    as="a"
                    href="#twitter"
                    variant="lead"
                    color="light-blue"
                    textGradient
                  >
                    <i className="fab fa-twitter" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography
                    as="a"
                    href="#instagram"
                    variant="lead"
                    color="purple"
                    textGradient
                  >
                    <i className="fab fa-instagram" />
                  </Typography>
                </Tooltip>
              </CardFooter>
            </Card>
          );
        };




export default DetailUser;