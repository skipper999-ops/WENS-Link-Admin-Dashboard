
// var url = "https://moovafrica.com/api/api";


console.log(process.env.NODE_ENV)

var url

if(process.env.NODE_ENV == "development"){

    var url = "http://127.0.0.1:8000/backend/api/";

}else{

    var url = "/backend/api/";
    
}

console.log(url)


export const state = () => ({



    login: url + "login/vendors",

    imageUpload: url + "products/upload/image",

    allProducts : url + "products/",

    singleProduct : url + "products/single/",

    getCategory : url + "products/product/home/category",

    getsubCategory : url + "products/product/subcategory",

    getAllSubCategory : url + "products/product/subcategory/all",

    getBrand : url + "products/product/brand",

    commissionList : url + "products/commissionList",

    commissionListtask : url + "products/commissionListtask",

    commissionListtaskEdit : url + "products/commissionListtaskEdit/", //id 

    getAllOrder : url + "orders",

    getAllAuction : url + "auction",
    
    getAllCompletedAuction : url + "auction/completed/",

    getAllOngoingAuction : url + "auction/ongoing/",

    addProduct : url + "products/create/product",

    addAuction : url + "auction/create",

    deleteProduct : url + "products/delete/",

    categoryFunctions : url + "products/product/category/",

    deleteSubCategory : url + "products/product/subcategory/delete/",

    deleteBrand : url + "products/product/brand/delete/",

    getsubCategoryDetails : url + "products/product/subcategory/single/", //id

    allProductsRequests : url + "products/allProductsRequests", //id

    changeProductStatus : url + "products/product/changeProductStatus/", //id

    changeUserStatus : url + "users/changeStatus/", //id

    getAllSeller : url + "users/", //id

    getSingleProducts : url + "products/single/", //id

    invoice_success : "payments/admin-invoice/", //id




})


export const getters = {
    // getLoginAPI(state) {
    //     return state.login
    // }
}
