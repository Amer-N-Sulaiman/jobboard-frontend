<template>
    <div class="card col-md-5 col-10 mt-5" style="margin:auto">
    <h1 class="card-header">Post a Job</h1>
    <div class="card-body">
        <form>
            <div class="mb-3">
                <label for="title" class="form-label">Job Title</label>
                <input type="text" class="form-control" id="title" v-model="title">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Job Description</label>
                <input type="text-area" class="form-control" id="description" v-model="description">
            </div>
            
            <button v-if="!submitting" type="button" class="btn btn-primary" @click="handleSubmit">Submit</button>
            <button v-else type="button" class="btn btn-primary" disabled>Submitting ...</button>

        </form>
    </div>

    </div>

    <div v-if="error" class="alert alert-danger col-10 col-md-5 mt-3 mx-auto" role="alert">
        {{ error }}
    </div>

    <div v-if="submittedSuccessfully" class="alert alert-info col-10 col-md-5 mt-3 mx-auto" role="alert">
        Your Job Was Posted Successfully
    </div>
</template>

<script>
import g_data from '@/g_data';
export default {
    name: 'AddJob',
    created(){
        if (!this.$cookies.isKey('token')){
            router.push('/listings')
            return
        }
    },
    data(){
        return {
            title: '',
            description: '',
            submitting: false,
            error: '',
            submittedSuccessfully: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.submitting = true;
            this.submittedSuccessfully = false
            const body = JSON.stringify({ 
                "title": this.title,
                "body": this.description
            })

            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+ this.$cookies.get('token')
                },
                body: body
            };

            try {
                const response = await fetch(g_data.api_url + "/job/add", requestOptions)
                const data = await response.json();
                if (data.error){
                    console.log('data', data.error)
                    throw data.error  
                }
                this.submittedSuccessfully = true
                this.error = '' 
            } catch(error) {
                this.error = error
            }
            this.submitting = false
            
        }
    }
}
</script>

<style>

</style>