import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Tables() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   const navigateToConfirmed= (post) =>{
    navigate(`/dashboard/profile`, { state: post}); // here we will redirect user and send your data into state
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Delivery Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["date", "branch", "item's", "destination", "consignee's name", "commodity", "total declared values", "payment", "status", "action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map(
                // ({ img, name, email, job, online, date }, key) => {
                (post, key) => {
                  const className = `py-3 px-5 ${
                    key === posts.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={post.id} onClick={() => navigateToConfirmed(post)}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                          <div>
                            {/* <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {"2024-03-18"}
                            </Typography> */}
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {"2024-03-18"}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {"Lucena"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {"3"}
                        </Typography>
                      </td>
                      <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                          {"Quezon City, Fairview, Brgy Anonas"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {"date"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {"2024-03-18"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {"PHP 525"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={true ? "green" : "blue-gray"}
                          value={true ? "paid" : "not paid"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={false ? "green" : "blue-gray"}
                          value={false ? "Delivered" : "In Transit"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {"Edit"}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      
    </div>
  );
}

export default Tables;
