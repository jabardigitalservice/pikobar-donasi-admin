<template>
  <section>
    <LoginFormCard />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'centered',
  components: {
    LoginFormCard: () => import('@/components/Auth/LoginForm/card'),
  },
  created() {
    this.checkExistingToken()
      .then((isAuth) => {
        if (isAuth) {
          this.$router.replace({
            path: '/admin',
          })
        }
      })
      .catch(() => {})
  },
  methods: {
    ...mapActions('auth', ['checkExistingToken']),
  },
}
</script>

<style lang="scss" scoped></style>
