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
    AssetTab 
  } from "@/pages/components";
  import React, { useState, useEffect, useRef } from 'react';
  import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  import { UserPlusIcon } from "@heroicons/react/24/solid";
  import ApiManager from '../../services/ApiManager';
  import Pusher from 'pusher-js';
  import Echo from 'laravel-echo';

  export function Assets() {
    const [assets, setAssets] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [modalState, setmodalState] = useState(false);
  
    useEffect(() => {
      const promise = ApiManager.assetList();
      promise.then(
        data => setAssets(data),
        error => {
          setAlertContent(error);
          setAlert(true);
        }
      )
    },[]);

    useEffect(() => {
      window.Pusher = Pusher;
      window.Echo = new Echo({
        broadcaster: 'pusher',
        wsHost: window.location.hostname,
        wsPort: 6001,
        // wssHost: window.location.hostname,
        // wssPort: 6001,
        key: 'myKey',
        cluster: "mt1",
        // disableStats: true,
        // enabledTransports: ['ws', 'wss'],
        forceTLS: false,
      });

      window.Echo.channel('community')
        .listen('.my-event', (event) => {
          console.log(event.message)
      })
    },[]);
  
    const handleAddProdModal = () => setmodalState(!modalState);
    const handleAlert = () => setAlert(false);
    const handleDataFromAddProd = (error) => {
      setAlertContent(error);
      handleAddProdModal();
      setAlert(true);
    }
  
    if(alert){
      setTimeout(() => {
        setAlert(false);
      }, 6000);
    }
  
    return (
      <>
        <AlertCustomStyles openPopUp={alert} closePopUp={handleAlert} message={alertContent}/>
        <AddProductDialog toggle={modalState} action={handleAddProdModal} message={handleDataFromAddProd}/>
        <Card className="h-full w-full mt-2">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Assets
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  Export
                </Button>
                <Button onClick={handleAddProdModal} className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <AssetTab alert={alert} posts={assets}/>
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
  
  export default Assets;