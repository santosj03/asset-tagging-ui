import {
    Card,
    CardBody,
    Typography,
    Carousel,
  } from "@material-tailwind/react";

  import { ProfileInfoCard } from "@/widgets/cards";
  import { useLocation} from "react-router-dom";
  import QRCode from "react-qr-code";
  import React, { useState } from 'react';
  
  export function AssetTagGroupDetails() {
    const {state} = useLocation();
    const assetGroup = state;
    const [selectedRow , setSelectedRow] = useState(-1);
    const [otherDetails , setOtherDetails] = useState({
      category : "",
      brand : "",
      total_asset : "",
      uom : "",
    })

    const [issuer , setIssuer] = useState({
      name : "",
      emp_no : "",
      department : "",
      date : "",
    })

    const [receiver , setReceiver] = useState({
      name : "",
      emp_no : "",
      department : "",
      date : "",
    })

    const changeValueComponent = (asset, key) => {
      setSelectedRow(key);
      setOtherDetails({
        category : assetGroup.category.name,
        brand : assetGroup.brand.name,
        total_asset : assetGroup.assets.length,
        uom : assetGroup.uom.name,
      });

      const details = asset.asset_tag;
      setIssuer({
        name : details.user.first_name +" "+ details.user.last_name,
        emp_no : "",
        department : details.user.department.name,
        date : details.updated_at
      });

      const employee = asset.asset_tag.employee;
      setReceiver({
        name : employee.first_name +" "+ employee.last_name,
        emp_no : employee.employee_no,
        department : employee.department.name,
        date : asset.asset_tag.updated_at,
      });
    }

    return (
      <>
        <div class="lg:flex">
          <div className="lg:w-[68%] w-[100%] h-fit">
            <Card className="mx-3 mt-6 mb-6 lg:mx-4 border border-blue-gray-100 h-fit">
              <CardBody className="p-4">
                <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-6">

                  <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={"asdsa"}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
   
                    <div>
                      <Typography variant="h5" color="blue-gray" className="mb-1">
                        Jayvee Santos
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600"
                      >
                        CEO / Co-Founder
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="gird-cols-1 mb-12">
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                      {["property no", "serial", "description", "lifespan"].map((el) => (
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
                      {assetGroup.assets.map(
                        (asset, key) => {
                          const className = `py-3 px-5 ${
                            key === assetGroup.assets.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                          }`;

                          return (
                            <tr className={selectedRow == key ? "bg-gray-300": ""} key={asset.id} onClick={() => changeValueComponent(asset, key)}>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {asset.property_no}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {asset.serial}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {asset.description}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {asset.lifespan}
                                </Typography>
                              </td>

                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
            <Card className="mx-3 mt-6 mb-6 lg:mx-4 border border-blue-gray-100 h-fit">
              <CardBody className="p-4">
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <ProfileInfoCard
                    title="Issue By:"
                    details={{
                      Name: issuer.name,
                      // "employee no": issuer.emp_no,
                      department: issuer.department,
                      "date issued": issuer.date,
                    }}
                  />
                  <ProfileInfoCard
                    title="Issued To:"
                    details={{
                      Name: receiver.name,
                      "employee no": receiver.emp_no,
                      department: receiver.department,
                      "date received": receiver.date,
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="lg:w-[33%] w-[100%] h-fit">
            <Card className="mx-3 mt-6 mb-2 lg:mx-4 border border-blue-gray-100 h-fit">
              <CardBody className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-6">
                    <div>
                      <Typography variant="h5" color="blue-gray" className="mb-1">
                        Other Details
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="gird-cols-1">
                    <ProfileInfoCard
                      details={{
                        "Category": otherDetails.category,
                        "Brand": otherDetails.brand,
                        "Total Asset": otherDetails.total_asset,
                        "Unit of Measure": otherDetails.uom,
                      }}
                    />
                    <hr className="mt-4 mb-3"/>
                    {/* <ProfileInfoCard
                      title="Accountability"
                      details={{
                        "Employee Name": "Dry",
                        "Employee No": "Some desc here",
                        "Department": "PHP 2000",
                        "Date issued": "Sender"
                      }}
                    /> */}
                </div>
              </CardBody>
            </Card>

            <div className="w-[100%] p-4 h-fit">
            <Carousel className="rounded-xl ">
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="image 3"
                className="h-full w-full object-cover"
              />
            </Carousel>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default AssetTagGroupDetails;
  