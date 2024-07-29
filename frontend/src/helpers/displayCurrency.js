
const displayAEDCurrency = (num)=>{

    const formatter = new Intl.NumberFormat("en-In",{
        style:"currency",
        currency: "AED",
        minimumFractionDigits: 2
    })
   return formatter.format(num)
}

export default displayAEDCurrency