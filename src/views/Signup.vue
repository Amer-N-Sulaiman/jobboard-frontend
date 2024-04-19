<template>
    <!-- <h1 class="title">
      Login
    </h1> -->
  
    <div class="card col-md-5 col-10 mt-5" style="margin:auto">
        <h1 class="card-header">Signup</h1>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="fullname" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="fullname" v-model="fullname">
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="text" class="form-control" id="email" v-model="email">
                    <small id="emailHelp" class="form-text text-muted">We'll only provide your email to employers you apply to work for.</small>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password">
                </div>
                
                <button v-if="!submitting" type="button" class="btn btn-primary" @click="handleSignup">Submit</button>
                <button v-else type="button" class="btn btn-primary" disabled>Submitting ...</button>

            </form>
        </div>
    </div>

    <div v-if="error" class="alert alert-danger col-10 col-md-5 mt-3 mx-auto" role="alert">
        {{ error }}
    </div>
</template>

<script>
import router from '../router';
import g_data from '@/g_data.js'

export default{
    data(){
        return {
            fullname: '',
            username: '',
            email: '',
            password: '',
            submitting: false,
            error: ''
        }
    },
    created(){
        if (this.$cookies.isKey('token')){
            router.push('/listings')
            return
        }
    },
    methods: {
        async handleSignup() {
            this.submitting = true;
            const body = JSON.stringify({ 
                "full_name": this.fullname,
                "username": this.username,
                'email': this.email,
                "password": this.password
            })

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            };

            try {
                const response = await fetch(g_data.api_url+"/user/signup", requestOptions)
                const data = await response.json();
                if (!data.token){
                    console.log('data', data)
                    throw data.error  
                } 
                const token = data.token
                this.$cookies.set('token', token)
                this.$cookies.set('username', data.username)
                this.$cookies.set('user_id', data.user_id)
                this.emitter.emit('loggedIn', token)
                router.push('/listings')
                
            } catch(error) {
                this.error = error
            }
            this.submitting = false
        }
    }
}
</script>

