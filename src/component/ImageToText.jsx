import React, { useState, useContext } from 'react';
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';
import { Context } from "../Context";
import './tip-form.css'



const ImageToText = () => {
  function FindTotal(bill) {
    let price;
    const lowerBill = bill.toLowerCase();
    const cleanBill = lowerBill.replace(/\n/g, " ")
    const billArr = cleanBill.split(' ')
    const index = billArr.lastIndexOf("total")
    console.log(billArr);
    if (index != -1) {
      const total = billArr[index + 1]
      price = toPrice(total);
    }
    else {
      price = -1
    }
    return price;
  }
  
  
  function toPrice(total) {
    const arrTotal = total.split('')
    const newArr = arrTotal.filter(value => !isNaN(value) || value == '.' || value == ',')
    const price = newArr.join('') * 1
    sessionStorage.setItem('price' ,price); 
    setPhotoPrice(sessionStorage.getItem('price'))
  
    return price;
  }
  const { photoPrice, setPhotoPrice } = useContext(Context);
  const [imageText, setImageText] = useState('');
  const [price, setPrice] = useState('')


  const handleImageDrop = async (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    const { data: { text } } = await Tesseract.recognize(imageFile);
    setImageText(text);
    console.log(text);
    setPrice(FindTotal(text.toLowerCase()))
    console.log(price);

  };

  return (
    <div>
      <Dropzone onDrop={handleImageDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <span className="material-symbols-outlined">
              photo_camera
            </span>
          </div>

        )}
      </Dropzone>
      <div id='price-image-to-text'>{price}</div>
    </div>
  );
};

export default ImageToText;
