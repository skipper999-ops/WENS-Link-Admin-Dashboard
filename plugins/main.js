import Vue from 'vue'

Vue.mixin({
    methods: {
        setFallbackImageUrl(event) {
            console.log('Image failed to load, setting fallback.')
            event.target.src = '/images/adv_1.png'
        }
    }
})