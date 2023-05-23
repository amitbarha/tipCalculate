import { useEffect, useState } from "react"
// import Rating from '@mui/material/Rating';
import { Autocomplete, Button, Rating } from '@mui/material'
import countries from './data.json'
import './tip-form.css'
import axios from 'axios'
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
    useEffect(() =>{
        getGeoInfo();
    },[])


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
            divideByAmount = Math.ceil(tip / amount)
            // setDataResult([...dataResult,totalPrice,tip,divideByAmount])

            console.log(`the total price is: ${totalPrice}`)
            console.log(`the tip is: ${tip}`)
            console.log(`the tip divided by the people is: ${divideByAmount}`)
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
                <div className="price fix-place">
                    <div>add price:</div>
                    <input type="number" placeholder="enter the price:" onChange={(e) => { setPrice(e.target.value) }} />
                </div>
                <div className="country fix-place">
                    <div>country:</div>
                    <input type="text" placeholder="enter the country:" value={chosenCountry} onChange={(e) => { setChosenCountry(e.target.value) }} />
                </div>
                <div className="rating-box">
                    <div>the service:</div>
                    <Rating onChange={(e) => {
                        setServiceRating(e.target.value * 50)
                    }}></Rating>
                    {serviceRating}
                </div>
                <div className="rating-box">
                    <div>the food:</div>
                    <Rating onChange={(e) => setFoodRating(e.target.value * 30)}></Rating>
                    {foodRating}
                </div>
                <div className="rating-box">
                    <div>the atmosophire:</div>
                    <Rating onChange={(e) => setAtmoRating(e.target.value * 20)}></Rating>
                    {atmoRating}
                </div>
                <div className="amount">
                    <div>amount of people:</div>
                    <input type="number" value={amount} min={1} max={50} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <Button onClick={handleCalculate}>calculate</Button>
            </div>
            <div className={`result ${block}`}>
                {`the total price is: ${dataResult[0]}`}
                <br />
                {`the tip is: ${dataResult[1]}`}
                <br />
                {`all person need to pay: ${dataResult[2]}`}
            </div>
        </div>

    )
}
export default Tipform