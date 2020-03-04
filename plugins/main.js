import Vue from 'vue'

Vue.mixin({
    methods: {
        setFallbackImageUrl(event) {
            console.log('Image failed to load, setting fallback.')
            event.target.src = '/admin/files/adv_1.png'
        },
        parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
    }
})