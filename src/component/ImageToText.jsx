import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';
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
  return price;
}



const ImageToText = () => {
  const [imageText, setImageText] = useState('');
  const [price, setPrice] = useState('')


  const handleImageDrop = async (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    const { data: { text } } = await Tesseract.recognize(imageFile);
    setImageText(text);
    console.log(text);
    setPrice(FindTotal(text.toLowerCase()))

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
    </div>
  );
};

export default ImageToText;
