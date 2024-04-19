<template>
  <!-- <h1 class="title">
    Job {{ $route.params.job_id }}
    <p v-for="applier in appliers" :key="applier.username"> {{ applier.email }} </p>
    <p v-if="error">Error: {{ error }}</p>
  </h1> -->

    <h1 class="title">Account</h1>

    <div class="card col-10 col-md-8 col-lg-6 mx-auto">
        <div class="card-header">
            Job Applicants
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="applier in appliers" v-bind:key="applier.username" class="list-group-item d-flex flex-column align-items-center justify-content-between">
                {{ applier.fullname }}, contact them at: <br><b>{{ applier.email }}</b>
            </li>
            <p v-if="fetchingAppliers" class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
            </p>
            <li v-if="!fetchingAppliers && appliers.length==0" class="list-group-item text-center">
                Noone has applied for this job yet.
            </li>
        </ul>
        
    </div>
</template>

<script>

import g_data from '@/g_data.js';

export default {
    name: 'Job',
    
    data(){
        return {
            appliers: [],
            error: '',
            fetchingAppliers: false
        }
    },
    created() {
        if (!this.$cookies.isKey('token')){
            router.push('/listings')
            return
        }
        this.fetchAppliers()
    },
    methods: {
        async fetchAppliers(){
            this.fetchingAppliers = true
            const token = this.$cookies.get('token')
            const requestOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+ token,
                },
            };
            try {
                const response = await fetch(g_data.api_url+"/job/all_job_appliers/"+this.$route.params.job_id, requestOptions)
                const data = await response.json()
                this.fetchingAppliers = false
                if (data.error) {
                    this.error = data.error
                    
                    return
                }
                this.appliers = data
            } catch(error) {
                console.log(error)
            }

        }
    }
}
</script>

<style>

</style>