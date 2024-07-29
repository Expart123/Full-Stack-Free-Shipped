// const { default: SummeryApi } = require("../common")

// const fetchCategoryWiseProduct = async (category)=>{

// const response = await fetch(SummeryApi.categoryWiseProduct.url,{
//     method : SummeryApi.categoryWiseProduct.method,
//     headers : {
//         "content-type"  : "application/json"
//     },
//     body : JSON.stringify({
//         category : category
//     })
// })

// const  dataResponse = await response.json()
// return dataResponse
// }

// export default fetchCategoryWiseProduct

// const { default: SummeryApi } = require("../common");

// const fetchCategoryWiseProduct = async (category) => {
//     const response = await fetch(SummeryApi.categoryWiseProduct.url, {
//         method: SummeryApi.categoryWiseProduct.method,
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify({
//             category: category,
//         }),
//     });

//     const dataResponse = await response.json();
//     return dataResponse;
// };

// export default fetchCategoryWiseProduct;

const { default: SummeryApi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummeryApi.categoryWiseProduct.url, {
            method: SummeryApi.categoryWiseProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ category }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error("Error fetching category wise product:", error);
        return null; // Handle error by returning null or a default value
    }
};

export default fetchCategoryWiseProduct;
