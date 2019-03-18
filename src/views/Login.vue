<template>
  <div class="login view">
    <top-bar title="Sign in"></top-bar>
    <div class="form" v-if="signedIn && !redirecting">
      <button @click="signOut">Sign out</button>
    </div>
    <div v-if="!signedIn" class="form">
      <div class="fields">
        <input type="text" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">
      </div>
      <div>
        <button @click="submit">Sign in</button>
      </div>
      <div class="warning" v-if="showWarning">
        Something went wrong.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login.view {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  .fields {
    min-width: 300px;
    margin-top: 1em;
  }
  input,
  button {
    font-size: 18px;
    display: block;
    width: 100%;
    margin-bottom: .5em;
    box-sizing: border-box;
  }
  .warning {
    padding: 20px;
    background-color: hsl(20, 70%, 60%);
  }
}
</style>

<script>
import store from '@/store'
import TopBar from '@/components/TopBar'
export default {
  name: 'login-view',
  data() {
    return {
      email: '',
      password: '',
      redirecting: false,
      showWarning: false
    }
  },
  components: {
    TopBar
  },
  computed: {
    signedIn() {
      return store.getters.signedIn
    }
  },
  methods: {
    signOut() {
      store.dispatch('signOut')
    },
    submit() {
      store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.redirecting = true
          console.log(this.$route.params)
          const nextPath = this.$route.params.nextUrl || '/'
          this.$router.push(nextPath)
        })
        .catch(() => {
          this.showWarning = true
        })
    }
  }
}
</script>