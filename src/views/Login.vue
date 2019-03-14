<template>
  <div class="login view">
    <div class="form" v-if="signedIn && !redirecting">
      <button @click="signOut">Sign out</button>
    </div>
    <div v-if="!signedIn" class="form">
      <h1>Log in</h1>
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
  .warning {
    padding: 20px;
    background-color: hsl(20, 70%, 60%);
  }
}
</style>

<script>
import store from '@/store'
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
          const nextPath = this.$route.params.to && this.$route.params.to.fullPath || '/'
          this.$router.push(nextPath)
        })
        .catch(() => {
          this.showWarning = true
        })
    }
  }
}
</script>