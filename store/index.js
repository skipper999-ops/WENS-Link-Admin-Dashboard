// import Vuex from 'vuex';
// import Vue from 'vue';

// Vue.use(Vuex);


// const createStore = () => {
//     return new Vuex.Store({
//         state: {
//             registrations: [],
//             users : 0
//         },
//         getters:{

//             getCurrentUser(state){
//                 return state.users
//             }
//         },
//         mutations:{
//             saveCurrentLoggedInUser(state, exercise){
//                 console.log('selecting exercise mutation, ' + exercise)
//                 state.users = exercise
//               }
//         },
//         actions:{
//             saveCurrentLoggedInUser(context, exercise){
//                 console.log('selecting exercise action, ' + exercise)
//                 context.commit('saveCurrentLoggedInUser', exercise);
//               }
//         }
//     });
//   };

//   export default createStore


import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const state = () => ({

    getCategory: [],
    getAllProducts: [],
    getAllOrder: [],
    getAllAuction: [],
    getAllCompletedAuction: [],
    getAllOngoingAuction: [],
    singleProduct: [],
    company_name: "",
    username: ""
})


export const mutations = {
    getCategory(state, getCategory) {
        console.log('selecting exercise mutation, ' + getCategory)
        state.getCategory = getCategory
    },
    getAllProducts(state, getAllProducts) {
        console.log('selecting exercise mutation, ' + getAllProducts)
        state.getAllProducts = getAllProducts
    },
    getAllOrder(state, getAllOrder) {
        console.log('selecting exercise mutation, ' + getAllOrder)
        state.getAllOrder = getAllOrder
    },
    getAllAuction(state, getAllAuction) {
        console.log('selecting exercise mutation, ' + getAllAuction)
        state.getAllAuction = getAllAuction
    },
    getAllCompletedAuction(state, getAllCompletedAuction) {
        console.log('selecting exercise mutation, ' + getAllCompletedAuction)
        state.getAllCompletedAuction = getAllCompletedAuction
    },
    getAllOngoingAuction(state, getAllOngoingAuction) {
        console.log('selecting exercise mutation, ' + getAllOngoingAuction)
        state.getAllOngoingAuction = getAllOngoingAuction
    },
    singleProduct(state, singleProduct) {
        console.log('selecting exercise mutation, ' + singleProduct)
        state.singleProduct = singleProduct
    },
    company_name(state, company_name) {
        console.log('selecting exercise mutation, ' + company_name)
        state.company_name = company_name
    },
    username(state, username) {
        console.log('selecting exercise mutation, ' + username)
        state.username = username
    },
}


export const getters = {
    get_selectedUserMessage(state) { 
        return state.selectedUserMessage 
    }
 }



export const actions = {



    // resetCogetCategoryunter({ commit, state }, payload) {

    //     console.log(payload)

    //     var bodyFormData = new FormData()

    //     bodyFormData.append('customer_id', payload)

    //     return new Promise((resolve, reject) => {

    //         axios({
    //             method: 'POST',
    //             url: state.api.resetCounter,
    //             data: bodyFormData,
    //             contentType: 'application/json',
    //             headers: {
    //                 'Authorization': "Bearer " + this.$cookies.get('access_token')
    //             }
    //         })
    //             .then(res => {
    //                 console.log(res)
    //                 console.log('response')
    //                 commit('checkCounter', 0);
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log('error in request', err)
    //             })
    //     })
    // },




    loginAsVendor({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'POST',
                data: payload,
                url: state.api.loginAsVendor,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },



    getCategory({ commit, state }) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getCategory,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    addCategory({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'POST',
                url: state.api.getCategory,
                data: payload,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getsubCategory({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            if(payload == 0){
                payload = "all"
            }

            axios({
                method: 'GET',
                url: state.api.getsubCategory + "/" + payload,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    invoice_success({ commit, state }, payload) {


        return new Promise((resolve, reject) => {


            axios({
                method: 'GET',
                url: state.api.invoice_success + payload,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },
    addSubCategory({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            console.log(payload)
            var bodyFormData = new FormData();
            bodyFormData.append("name", payload.name);
            bodyFormData.append("category", payload.category);
      

            axios({
                method: 'POST',
                url: state.api.getsubCategory + "/" + payload.category,
                data: bodyFormData,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getsubCategoryDetails({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getsubCategoryDetails + payload,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    saveSpecs({ commit, state }, payload) {


        var bodyFormData = new FormData();

        bodyFormData.append('id', payload.id)

        bodyFormData.append('specs', payload.specs)



        return new Promise((resolve, reject) => {

            axios({
                method: 'PUT',
                url: state.api.getsubCategoryDetails + payload.id,
                contentType: 'application/json',
                data: bodyFormData,
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    getBrand({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            
            if(payload == 0){
                payload = "all"
            }

            axios({
                method: 'GET',
                url: state.api.getBrand + "/" + payload,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getCategory', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    allProducts({ commit, state }, {limit, offset}) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.allProducts + '?limit=' + limit + '&offset=' + offset,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getAllProducts', res.data.result);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getAllOrder({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getAllOrder,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getAllOrder', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getAllAuction({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getAllAuction,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getAllAuction', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getAllCompletedAuction({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getAllCompletedAuction + localStorage.getItem("currentUserID"),
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getAllCompletedAuction', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getAllOngoingAuction({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getAllOngoingAuction + localStorage.getItem("currentUserID"),
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getAllOngoingAuction', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    singleProduct({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.singleProduct + localStorage.getItem("auction_item"),
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('singleProduct', res.data);
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },



    addProduct({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'POST',
                data: payload,
                url: state.api.addProduct,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    addAuction({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'POST',
                data: payload,
                url: state.api.addAuction,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    deleteProduct({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'DELETE',
                data: payload,
                url: state.api.deleteProduct + payload + "/",
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getSingleProduct({ commit, state }, payload) {

        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getSingleProducts + payload + "/",
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    updateProduct({ commit, state },  { payload, id }) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'PUT',
                data: payload,
                url: state.api.singleupdate + id + "/",
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    deleteCategory({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'DELETE',
                data: payload,
                url: state.api.categoryFunctions + payload ,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    editCategory({ commit, state }, {id , payload}) {


        console.log(id)
        console.log(payload)

        console.log(state.api.categoryFunctions)


        return new Promise((resolve, reject) => {

            axios({
                method: 'PUT',
                data: payload,
                url: state.api.categoryFunctions + id,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    deleteSubCategory({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'DELETE',
                data: payload,
                url: state.api.deleteSubCategory + payload ,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    deleteBrand({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'DELETE',
                data: payload,
                url: state.api.deleteBrand + payload ,
                contentType: 'application/json',
                headers: {
                 'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },



    allProductsRequests({ commit, state }, {limit, offset}) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.allProductsRequests + '?limit=' + limit + '&offset=' + offset,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    changeProductStatus({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            var bodyFormData = new FormData()

            bodyFormData.append('status' , payload.status)
            bodyFormData.append('product_name' , payload.product_name)
            bodyFormData.append('sku' , payload.sku)
            bodyFormData.append('number' , payload.number)

            axios({
                method: 'PUT',
                data: bodyFormData,
                url: state.api.changeProductStatus + payload.id,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },
    changeUserStatus({ commit, state }, { id, status}) {


        return new Promise((resolve, reject) => {

            var bodyFormData = new FormData()

            bodyFormData.append('status' , status)

            axios({
                method: 'PUT',
                data: bodyFormData,
                url: state.api.changeUserStatus + id,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getAllSeller({ commit, state }) {


        return new Promise((resolve, reject) => {



            axios({
                method: 'GET',
                url: state.api.getAllSeller,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    getAllSubAdmin({ commit, state }) {


        return new Promise((resolve, reject) => {



            axios({
                method: 'GET',
                url: state.api.getAllSubAdmin,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    addSubAdmin({ commit, state }, payload) {


        return new Promise((resolve, reject) => {



            axios({
                method: 'POST',
                data: payload,
                url: state.api.addSubAdmin,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    commissionList({ commit, state }) {


        return new Promise((resolve, reject) => {



            axios({
                method: 'GET',
                url: state.api.commissionList,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },


    commissionListtask({ commit, state }, {id , payload}) {


        return new Promise((resolve, reject) => {



            axios({
                method: 'POST',
                data: payload,
                url: state.api.commissionListtask,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },

    commissionListtaskEdit({ commit, state }, {id , payload}) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'PUT',
                data: payload,
                url: state.api.commissionListtaskEdit + id,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },
    getAllBanner({ commit, state }) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getallbanner,
                contentType: 'application/json'
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },
    addBanner({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'POST',
                data: payload,
                url: state.api.addBanner,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },
    editDeleteBanner({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'DELETE',
                url: state.api.editDeleteBanner + payload,
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    resolve(res)
                })
                .catch(err => {
                    console.log('error in request', err)
                })
        })
    },






}

