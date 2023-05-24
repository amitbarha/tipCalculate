import { useEffect, useState } from "react"
// import Rating from '@mui/material/Rating';
import { Autocomplete, Button, Rating, TextField, InputLabel } from '@mui/material'
import countries from './data.json'
import './tip-form.css'
import './popup.css'
import axios from 'axios'
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';
const tipData = countries




function Tipform() {
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
    }, [])


    const [serviceRating, setServiceRating] = useState()
    const [foodRating, setFoodRating] = useState()
    const [atmoRating, setAtmoRating] = useState()
    const [price, setPrice] = useState()
    const [amount, setAmount] = useState(1)
    const [block, setBlock] = useState('')
    const [dataResult, setDataResult] = useState([])

    let tips;
    let tip;
    let totalPrice;
    let divideByAmount;


    function handleCalculate() {

        let chosenTip;
        const index = tipData.countries.findIndex(c => c.country.toLowerCase() === chosenCountry.toLowerCase());
        if (index != -1) {
            tips = tipData.countries[index].tips
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
            sessionStorage.setItem('tip', tip)
            sessionStorage.setItem('totalPrice', totalPrice)
            sessionStorage.setItem('divideByAmount', divideByAmount)


            setDataResult([dataResult[0] = totalPrice, dataResult[1] = tip, dataResult[2] = divideByAmount])
            setBlock('block')
            console.log(dataResult);

        }
        else
            console.log('not exist');



    }



    return (
        <div className="container">
            <div className="form">
                <div className="inputs">
                    <div className="country fix-place">
                        <InputLabel htmlFor="country-input">
                            Country
                        </InputLabel>
                        <TextField id="country-input" type="text"  placeholder="enter the country:" value={chosenCountry} onChange={(e) => { setChosenCountry(e.target.value) }} />
                    </div>
                    <div className="price fix-place">
                        <br />
                        <TextField type="number" label="Enter price" placeholder="Enter the price:" onChange={(e) => { setPrice(e.target.value) }} />
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
                        <div>Atmosophire:</div>
                        <Rating size="large" onChange={(e) => setAtmoRating(e.target.value * 20)}></Rating>
                    </div>
                </div>
                <div className="calc-button">
                    <Popup
                        trigger={<Button>Your'e Tip</Button>}
                        modal
                        closeOnDocumentClick
                        onOpen={handleCalculate}
                    >
                        {close => (
                            // <div className="background-popup">
                                <div className="popup">
                                    <button className="close-btn" onClick={close}>
                                        X
                                    </button>
                                    <div className="text-popup">
                                        <h1>Tip Summary</h1>
                                        <h2>The tip is {dataResult[1]}</h2>
                                        <h2>Total price {dataResult[0]}</h2>
                                        <h2>Each person {dataResult[2]}</h2>
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