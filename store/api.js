var url

if(process.env.NODE_ENV == "development"){

    var url = "http://127.0.0.1:8000/backend/api/";

}else{

    var url = "/backend/api/";

}

console.log(url)


export const state = () => ({



    login: url + "login/",

    register: url + "vendors/create/",

    seller_info: url + "vendors/seller_info/",

    seller_interview: url + "vendors/seller_interview/",

    getCompany_name: url + "vendors/company_name/", //phone_number

    tax: url + "vendors/tax/",

    otp: "http://weberleads.in/http-jsonapi.php?",

    otp_verify: url + 'vendors/otp_verify/',

    resendOTP: url + 'vendors/resendOTP/',

    company_name:  url +  "vendors/company_name/",

    getStep:  url +  "vendors/getStep/", //phone_number

    createOrder:  url +  "payments/create/order", //phone_number


})