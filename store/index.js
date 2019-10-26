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
    //                 'Authorization': "bearer " + this.$cookies.get('access_token')
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




    getCategory({ commit, state }) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.getCategory,
                contentType: 'application/json',
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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

    allProducts({ commit, state }, payload) {


        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.allProducts + localStorage.getItem("currentUserID"),
                contentType: 'application/json',
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('response')
                    commit('getAllProducts', res.data);
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                url: state.api.deleteCategory + payload ,
                contentType: 'application/json',
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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
                // headers: {
                //     'Authorization': "bearer " + this.$cookies.get('access_token')
                // }
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

