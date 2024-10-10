import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { 
  AddProductDialog, 
  AlertCustomStyles, 
  AssetGroupTab, AssetListTab 
} from "@/pages/components";
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import ApiManager from '../../services/ApiManager';

const TABS = [
  {
    label: "Group",
    value: "by-group",
  },
  {
    label: "Asset",
    value: "by-list",
  }
];
   
export function AssetTag() {
  const [assetTagGroup, setAssetTagGroup] = useState([]);
  const [assetTagList, setAssetTagList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [modalState, setmodalState] = useState(false);
  const [selectedTab, setSelectedTab] = useState('by-group');

  useEffect(() => {
    if(selectedTab == "by-group"){
      const promise = ApiManager.assetTagGroup();
      promise.then(
        data => {
          setAssetTagGroup(data);
        },
        error => {
          setAlertContent(error);
          setAlert(true);
        }
      )
    }else{
      const promise = ApiManager.assetTagList();
      promise.then(
        data => {
          console.log(data)
          setAssetTagList(data);
        },
        error => {
          setAlertContent(error);
          setAlert(true);
        }
      )
    }
  },[selectedTab]);

  const openModal = () => setmodalState(!modalState);
  const handleModal = () => setAlert(false);
  const setTabSelected = (val) => setSelectedTab(val);
  const handleDataFromAddProd = (error) => {
    setAlertContent(error);
    openModal();
    setAlert(true);
  }

  if(alert){
    setTimeout(() => {
      setAlert(false);
    }, 6000);
  }

  return (
    <>
      <AlertCustomStyles openPopUp={alert} closePopUp={handleModal} message={alertContent}/>
      <Card className="h-full w-full mt-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Assets Tag
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Export
              </Button>
              <Button onClick={openModal} className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create
              </Button>
              <AddProductDialog toggle={modalState} action={openModal} message={handleDataFromAddProd}/>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value={selectedTab} className="w-full md:w-max ">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab 
                    key={value} 
                    value={value} 
                    onClick={() => setTabSelected(value)}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {
            selectedTab == 'by-list' 
            ? <AssetListTab alert={alert} posts={assetTagList}/>
            : <AssetGroupTab alert={alert} posts={assetTagGroup}/>
          }
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default AssetTag;