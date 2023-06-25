import { useEffect, useState, useContext } from "react"
// import Rating from '@mui/material/Rating';
import { Autocomplete, Button, Rating, TextField, InputLabel } from '@mui/material'
import countries from './data.json'
import './tip-form.css'
import './popup.css'
import axios from 'axios'
import { Context } from "../Context";
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';
import ImageToText from "./ImageToText"
const tipData = countries
const HOST = 'https://tipcalculatordb.onrender.com'




function Tipform() {
    const [dataTips, setDataTips] = useState()
    const [chosenCountry, setChosenCountry] = useState()
    function getGeoInfo() {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            setChosenCountry(data.country_name)
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getGeoInfo();

        axios.get(`${HOST}/tips`)
        .then(response => {
            setDataTips(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, [])
    const [serviceRating, setServiceRating] = useState(1)
    const [foodRating, setFoodRating] = useState(1)
    const [atmoRating, setAtmoRating] = useState(1)
    const [price, setPrice] = useState(0)
   
    const [amount, setAmount] = useState(1)
    const [block, setBlock] = useState('')
    const [dataResult, setDataResult] = useState([])
    const [backgroundFlag, setBackgroundFlag] = useState();
    const { photoPrice, setPhotoPrice } = useContext(Context);
    let tips;
    let tip;
    let totalPrice;
    let divideByAmount;
    

    function handleCalculate() {

        let chosenTip;
        // setIndex(tipData.countries.findIndex(c => c.country.toLowerCase() === chosenCountry.toLowerCase()));
        const index = dataTips?.findIndex(c => c.country.toLowerCase() === chosenCountry.toLowerCase())
        if (index != -1) {
            setBackgroundFlag(dataTips[index].flag)
            tips = dataTips[index].tips
            console.log(tips);
            let totalRating = serviceRating + foodRating + atmoRating;
            if (totalRating >= 370)
                chosenTip = tips.good
            if (totalRating <= 250)
                chosenTip = tips.poor;
            if (totalRating > 250 && totalRating < 370)
                chosenTip = tips.standard;
            tip = Math.ceil(price * chosenTip)
            totalPrice = Math.ceil(tip + price * 1);
            divideByAmount = Math.ceil(totalPrice / amount)
            
            const coin = dataTips[index].coin;
            setDataResult([dataResult[0] = totalPrice, dataResult[1] = tip, dataResult[2] = divideByAmount, dataResult[3] = coin])
            setBlock('block')
           

        }
        else
            console.log('not exist');



    }



    return (
        <div className="container" >
            <div className="form">
                <div className="inputs">
                    <div className="country fix-place">
                        <InputLabel htmlFor="country-input">
                            Country
                        </InputLabel>
                        <TextField id="country-input" type="text" placeholder="enter the country:" value={chosenCountry} onChange={(e) => { setChosenCountry(e.target.value) }} />
                    </div>
                    <br />
                    <div className="price-input">
                        <br />
                        <TextField type="number" label="Enter price" value={price} placeholder="Enter the price:" onChange={(e) =>{ setPrice(e.target.value) }} />
                        <div>
                        <ImageToText />
                        {sessionStorage.getItem('price')&& <button onClick={() => setPrice(sessionStorage.getItem('price'))}>add</button>}
                        </div>
                    </div>
                    <div className="amount">
                        <br />
                        <TextField type="number" label="Number of people" value={amount} min={1} max={50} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                </div>

                <div className="ratings">
                    <div className="rating-box">
                        <div>Service:</div>
                        <Rating size="large" onChange={(e) => {
                            setServiceRating(e.target.value * 50)
                        }}></Rating>
                    </div>
                    <div className="rating-box">
                        <div>Food:</div>
                        <Rating size="large" onChange={(e) => setFoodRating(e.target.value * 30)}></Rating>
                    </div>
                    <div className="rating-box">
                        <div>Atmosphere:</div>
                        <Rating size="large" onChange={(e) => setAtmoRating(e.target.value * 20)}></Rating>
                    </div>
                    <div></div>
                </div>
                <div className="calc-button">
                    <Popup
                        trigger={<Button>Your Tip</Button>}
                        modal
                        closeOnDocumentClick
                        onOpen={handleCalculate}
                    >
                        {close => (
                            // <div className="background-popup">
                            <div className="popup" style={{ backgroundImage: `url(${backgroundFlag})` }}>
                                <button className="close-btn" onClick={close}>
                                    X
                                </button>
                                <div className="text-popup">
                                    <h1>Tip Summary</h1>
                                    {dataResult[1] != 0 ? <h2>The tip is {dataResult[1]}{dataResult[3]}</h2> : <h2 style={{ textAlign: 'center' }}>In this country the Tip is not expected or required in relation to the grade you gave. </h2>}
                                    <h2>Total price {dataResult[0]}{dataResult[3]}</h2>
                                    <h2>Each person {dataResult[2]}{dataResult[3]}</h2>
                                    <Link to={'/fix'}>Find mistakes?</Link>
                                </div>
                                
                            </div>
                            // </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>

    )
}
export default Tipform