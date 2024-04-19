<template>
  <div class="card col-sm-10 col-md-6">
    <!-- <img src="..." class="card-img-top" alt="..."> -->
    <div class="card-body">
        <h5 class="card-title mb-3">{{ job.title }}</h5>
        <p class="card-text">{{ job.body }}</p>
        <button v-if="!didApply && !submitting" class="btn btn-primary" @click="handleApply">Apply</button>
        <button v-if="submitting" class="btn btn-primary" @click="handleApply">Applying ...</button>
        <button v-if="didApply && !submitting" class="btn btn-primary" @click="handleApply">Cancel Apply</button>
        <p class="mt-3"><em>Posted By {{ job.posted_by }} On {{ job.date_posted }}</em></p>
    </div>
    </div>
</template>

<script>
import g_data from '@/g_data.js'
export default {
    name: 'JobListingCard',
    created() {
        this.emitter.on('loggedOut', ()=>{this.refresher=!this.refresher})
    },
    props: {
        job: null
    },
    data(){
        return {
            refresher: false,
            submitting: false
        }
    },
    computed: {
        user(){
            if (!this.$cookies.isKey('token')){
                return null
            }
            const new_user = {
                username: this.$cookies.get('username'),
                token: this.$cookies.get('token'),
                user_id: this.$cookies.get('user_id')
            }
            
            return new_user
        },
        didApply(){
            if (!this.$cookies.isKey('token')){
                return false
            }

            const user_id = this.$cookies.get('user_id')
            this.refresher
            if (this.job.appliers.includes(user_id)){
                return true
            } else{
                return false
            }
        }
    },
    methods: {
        async handleApply() {

            if (!this.user){
                this.$notify({
                    type: "warn",
                    title: "You're Not Logged In",
                    text: "Please log in to continue"
                })
                return
            }
            this.submitting = true;

            const requestOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+ this.user.token,
                },
                
                
            };
            try {
                const response = await fetch(g_data.api_url+"/job/apply/" + this.job.id, requestOptions)
                const data = await response.json()
                this.job.appliers = data.appliers
            } catch(error) {
                console.log(error)
            }
            this.refresher = !this.refresher
            this.submitting = false

        }
    }
}
</script>

<style>
    .jobListingCard{
        margin: 20px auto
    }
</style>