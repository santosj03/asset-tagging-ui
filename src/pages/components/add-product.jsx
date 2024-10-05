import React, {useState, useEffect} from "react";
import {
  Card,
  Input,
  Option,
  Select,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Spinner
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ApiManager from '../../services/ApiManager';

export function AddProductDialog(props) {
  const modalState = props.toggle
  const action = props.action
  const TABLE_HEAD = ["Category", "Serial#", "ItemName", "Lifespan", "Action"];
  const [dataState, setdataState] = useState([]);
  const [inputData , setinputData] = useState({})
  const [categoryState, setcategoryState] = useState([]);
  const [isLoading, setisLoadingState] = useState(true);

  const handleChange = (e, isSelectOption = false) => {
    if(isSelectOption){
      setinputData(inputData => ({
        ...inputData,
        'category' : e
      }))
    }else{
      const {id , value} = e.target
      setinputData(inputData => ({
        ...inputData,
        [id] : value
      }))
    }
  }

  const handleClick = () => {
    setdataState(dataState => (
      [...dataState, inputData]
    ))
  }

  const removeItem = (index) => {
    if (index !== -1) {
      dataState.splice(index, 1);
      setdataState(dataState => (
        [...dataState, dataState]
      ))
    }
  }

  useEffect(() => {
    function fetchCategory() {
      const promise = ApiManager.assetCategory()
      promise.then(
        data => {
          setcategoryState(data)
          setisLoadingState(false);
        },
        error => props.message(error)
      )
    }

    if(modalState) {fetchCategory()}
  },[modalState, props]);

  return (
    <>
      <Dialog size="lg" open={modalState} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Item
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={action}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div className="flex gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Category
              </Typography>
              <div className="flex justify-center items-center relative">
                <Select
                  id="category"
                  value={inputData.category}
                  onChange={(e)=> handleChange(e, true)} 
                  className=" !w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                  placeholder="1"
                  disabled={isLoading}
                  labelProps={{
                    className: "hidden",
                  }}
                >
                  {categoryState.map((option) => (
                    <Option value={option.name}> {option.name} </Option>
                  ))}
                </Select>
                <Spinner className={`h-6 w-6 text-gray-100/3 absolute ${!isLoading ? 'hidden' : ''}`} />
              </div>
              
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Serial
              </Typography>
              <Input
                id="serial" 
                value={inputData.serial}
                onChange={handleChange}
                color="gray"
                size="lg"
                placeholder="eg. Barcode serial"
                name="weight"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Item Name
              </Typography>
              <Input
                id="item_name" 
                value={inputData.item_name}
                onChange={handleChange}
                color="gray"
                size="lg"
                placeholder="eg. Item Desciption"
                name="size"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Lifespan
              </Typography>
              <Input
                id="lifespan" 
                value={inputData.lifespan}
                onChange={handleChange}
                color="gray"
                size="lg"
                placeholder="eg. 1yr"
                name="size"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="mt-8">
              <Button className="ml-auto" disabled={isLoading} onClick={handleClick}>Add</Button>
            </div>
          </div>
          <div>
            <Card className="max-h-80 overflow-visible overflow-y-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="group text-sm text-black dark:text-white">
                  {dataState.map(({ category, serial, item_name, lifespan }, index) => {
                    const isLast = index === dataState.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr
                        key={index}
                        className={`even:bg-surface-light dark:even:bg-surface-dark ${!serial ? 'hidden' : ''}`}
                      >
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {serial}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item_name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {lifespan}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Button size="sm" color="red" variant="text" className="rounded-full" onClick={() => removeItem(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75" />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="green" disabled={isLoading} onClick={action}>Save</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddProductDialog;