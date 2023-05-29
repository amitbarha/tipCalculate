const bill = "Lorem ipsun s1.25 Dolor sit amet 57.99 Consectetur 526.70 Adipiscing elit $15.49 Sed semper $18.79 Accunsan ante $42.99 Non laoreet $9.99 Dui dapibus eu 527.50 sub Total $150.70 sales Tax $5.29 TOTAL $395.99 Paid By: creait o2/08/2022 09136 Teansaction 10: 234-567690 Vandor 10; 987654-321 Thank You For Supporting TLocal Business!"
const lowerBill = bill.toLowerCase();
const billArr = lowerBill.split(' ')
const index = billArr.lastIndexOf("total") 
billArr.splice(0,index)
console.log(billArr);



function FindTotal(bill)
{
    let price;
    const lowerBill = bill.toLowerCase();
    const billArr = lowerBill.split(' ')
    console.log(billArr);
    const index = billArr.lastIndexOf("total") 
    if(index != -1)
    {
        const total = billArr[index+1]
        price = toPrice(total);
    }
    else
    {
        price = -1
    }
    return price;
}
function toPrice(total)
{
    const arrTotal = total.split('')
    const newArr = arrTotal.filter(value => !isNaN(value) || value=='.' || value==',')
    const price = newArr.join('') *1
    return price;
}

console.log(FindTotal(bill));