<template>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
        <div class="container-fluid">
            <!-- Title -->
            <router-link to="/" class="navbar-brand" href="#">ANS Job Board</router-link>

            <!-- Toggle Button -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Logged Out Menu -->
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/listings">Jobs Listings</router-link>
                    </li>
                    <li v-if="!token" class="nav-item">
                        <router-link class="nav-link" to="/signup">Signup</router-link>
                    </li>
                    <li v-if="!token" class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li v-if="token" class="nav-item">
                        <router-link class="nav-link" to="/account" >Account</router-link>
                    </li>
                    <li v-if="token" class="nav-item">
                        <router-link class="nav-link" to="/addjob" >Post a Job</router-link>
                    </li>
                    <li v-if="token" class="nav-item">
                        <router-link class="nav-link" to="#" @click="handleLogout">Logout</router-link>
                    </li>
                </ul>
            </div>

            <!-- Logged In Menu -->
        </div>
    </nav>
</template>

<script>


    export default{
        name: 'Navbar',
        created(){
            this.emitter.on('loggedIn', token=>{
                this.refresh=!this.refresh
                console.log('emitted log in')
            })
        },
        
        data(){
            return{
                refresh: false
            }
        },
        computed: {
            token() {
                console.log('token recomputed')
                this.refresh;
                const token = this.$cookies.get('token')
                return token
            }
        },
        methods: {
            handleLogout() {

                
                this.$cookies.remove('token')
                this.refresh = !this.refresh
                this.emitter.emit('loggedOut')
                this.$router.push('/listings')
            }
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>