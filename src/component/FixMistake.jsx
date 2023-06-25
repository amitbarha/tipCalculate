import './fix-mistake.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const HOST = 'https://tipcalculatordb.onrender.com'

function FixMistake() {
    const [dataTips, setDataTips] = useState()
    const [chosenCountry, setChosenCountry] = useState()
    const [updateMessage, setUpdatdeMessage] = useState()
    const [createMessage, setCreateMessage] = useState()
    useEffect(() => {
        axios.get(`${HOST}/tips`)
            .then(response => {
                setDataTips(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleEdit = (e) => {
        e.preventDefault();
        console.log(e);
        const good = e.target[0].value
        const standard = e.target[1].value
        const poor = e.target[2].value

        axios.patch(`${HOST}/tips/update`,  {_id: chosenCountry?._id,  tips: {good: good, standard: standard, poor: poor} } )
                .then(data => {
                    console.log(data);
                    setUpdatdeMessage("Thank you!")
                })
                .catch(error => {
                    console.error(error);
                    setUpdatdeMessage("Not working, Try later")
                });
    
      };

      const handleCreate = (e) => {
        e.preventDefault();
        console.log(e);
        const country = e.target[0].value
        const good = e.target[1].value
        const standard = e.target[2].value
        const poor = e.target[3].value

        axios.post(`${HOST}/tips/create`,  {country: country, tips: {good: good, standard: standard, poor: poor}  } )
                .then(data => {
                    console.log(data);
                    setCreateMessage("Thank you!")
                })
                .catch(error => {
                    console.error(error);
                    setCreateMessage("Not working, Try later")
                });
    
      };

    return (
        <div className='fix-container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="title-fix">
                <h1>Add from your brain to my Data</h1>
            </div>
            <div className="forms-fix">
                <div className="add-country form-fix">
                    <div className="title-fix">
                        <h1>Add Country:</h1>
                    </div>
                    <div className="inputs-fix">
                      
                        <form onSubmit={(data) => handleCreate(data)} style={{ marginTop: '10px' }}>
                        <div>
                                <label htmlFor="country-name" className="label-style">Country:</label>
                                <input
                                    type="text"
                                    id="country-name"
                                    placeholder="Country"
                                    className="input-style"
                                />
                            </div>
                            <div>
                                <label htmlFor="goodService" className="label-style">Good Service:</label>
                                <input
                                    type="text"
                                    id="goodService"
                                    placeholder="Good Service"
                                    className="input-style"
                                />
                            </div>
                            <div>
                                <label htmlFor="standardService" className="label-style">Standard Service:</label>
                                <input
                                    type="text"
                                    id="standardService"
                                    placeholder="Standard Service"
                                    className="input-style"
                                />
                            </div>
                            <div>
                                <label htmlFor="poorService" className="label-style">Poor Service:</label>
                                <input
                                    type="text"
                                    id="poorService"
                                    placeholder="Poor Service"
                                    className="input-style"
                                />
                            </div>
                            <input type="submit" value="Submit" className="submit-button" />
                        </form>
                        <div>{createMessage}</div>
                    </div>
                </div>
                <div className="update-data form-fix">
                    <div className="title-fix">
                        <h1>Update The Data:</h1>
                    </div>
                    <div className="inputs-fix">
                        <label htmlFor="countrySelect" id="demo-multiple--label" className="label-style">
                            Select Country:
                        </label>
                        <select
                            className="select-style"
                            id="countrySelect"
                            onChange={(e) =>
                                setChosenCountry(
                                    dataTips.find((element) => element.country === e.target.value)
                                )
                            }
                        >
                            <option value="1">Select Country</option>
                            {dataTips?.map((data, index) => (
                                <option key={index} value={data.country}>
                                    {data.country}
                                </option>
                            ))}
                        </select>
                        <form onSubmit={(data) => handleEdit(data)} style={{ marginTop: '10px' }}>
                            <div>
                                <label htmlFor="goodService" className="label-style">Good Service:</label>
                                <input
                                    type="text"
                                    id="goodService"
                                    placeholder="Good Service"
                                    defaultValue={chosenCountry?.tips.good}
                                    className="input-style"
                                />
                            </div>
                            <div>
                                <label htmlFor="standardService" className="label-style">Standard Service:</label>
                                <input
                                    type="text"
                                    id="standardService"
                                    placeholder="Standard Service"
                                    defaultValue={chosenCountry?.tips.standard}
                                    className="input-style"
                                />
                            </div>
                            <div>
                                <label htmlFor="poorService" className="label-style">Poor Service:</label>
                                <input
                                    type="text"
                                    id="poorService"
                                    placeholder="Poor Service"
                                    defaultValue={chosenCountry?.tips.poor}
                                    className="input-style"
                                />
                            </div>
                            <input type="submit" value="Submit" className="submit-button" />
                        </form>
                        <div>{updateMessage}</div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default FixMistake