import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
    Carousel,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { platformSettingsData, conversationsData, projectsData } from "@/data";
  import { useLocation} from "react-router-dom";
  import QRCode from "react-qr-code";
  
  export function Delivery_details() {
    const {state} = useLocation();
    console.log(state) // here you get your post data

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
                  <tr>
                    {["item", "desciption", "commodity", "declared value"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-12 text-left"
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
                </div>
              </CardBody>
            </Card>
            <Card className="mx-3 mt-6 mb-6 lg:mx-4 border border-blue-gray-100 h-fit">
              <CardBody className="p-4">
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <ProfileInfoCard
                    title="Sender data"
                    details={{
                      date: "march 19, 1999",
                      branch: "(44) 123 1234 123",
                      "shippers name": "Pandoy",
                      destination: "alecthompson@mail.com",
                      "consignee's name": "USA",
                      contact: "092779010456",
                      origin: "092779010456",
                      asd: "092779010456",
                      gfdg: "092779010456",
                      gfhf: "092779010456",
                    }}
                  />
                  <ProfileInfoCard
                    title="Receiver data"
                    details={{
                      branch: "(44) 123 1234 123",
                      "consignee's name": "USA",
                      address: "Quezon City, Fairview, Brgy Anonas",
                      contact: "092779010456",
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
                        commodity: "Dry",
                        "description of goods": "Some desc here",
                        "declared values": "PHP 2000",
                        "payment by": "Sender",
                        payment: "Paid",
                      }}
                    />
                    <hr className="mt-4 mb-3"/>
                    <ProfileInfoCard
                      title="Computation"
                      details={{
                        commodity: "Dry",
                        "description of goods": "Some desc here",
                        "declared values": "PHP 2000",
                        "payment by": "Sender",
                        payment: "Paid",
                      }}
                    />
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
  
  export default Delivery_details;
  