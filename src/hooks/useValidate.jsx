import { useState } from 'react';

const useValidate = initData => {
  const [data, setData] = useState(initData);

  // handle data value
  const handleDataValue = e => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'avatar') {
      value = e.target.files[0];      
    }

    setData(prevData =>  ({...prevData, [name]: {...prevData[name], value}}));
  }

  // validate data
  const validateData = handleAction => {
    let errors = 0;

    let tempData = {};

    for (const item in data) {
      const dataItem = data[item];

      // check if item is avatar
      if (item === 'avatar') {

        // check if value is false
        if (!dataItem.value) {
          errors ++;
          tempData[item] = {...dataItem, error: false};
        } else if (!['image/png', 'image/jpg', 'image/jpeg'].includes(dataItem.value.type)) { // check for file type
          tempData[item] = {...dataItem, error: 'Invalid image format (Allowed: jpg, jpeg, png)'};
          errors ++;
        } else {
          tempData[item] = {...dataItem, error: false};
        }
        break;
      }

      // check empty value
      if (!dataItem.value.trim()) {
        tempData[item] = {...dataItem, error: 'The field can\'t be empty!'}
        errors ++;
      } else if (item === 'email') { // check email validation
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'ig');
        if (!dataItem.value.match(regex)) {
          tempData[item] = {...dataItem, error: 'The email address is not valid!'}
          errors ++;
        } else {
          tempData[item] = {...dataItem, error: false};
        }
      } else if (item === 'password' && dataItem.value.length < 6) { // check password length
        tempData[item] = {...dataItem, error: 'Password must contain at least 6 characters.'}
        errors ++;
      } else {
        tempData[item] = {...dataItem, error: false};
      }
    }

    setData(tempData);

    if (errors > 0) return;
    handleAction();
  }

  return {data, handleDataValue, validateData};
}

export default useValidate;