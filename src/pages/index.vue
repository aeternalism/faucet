<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useHead } from '@vueuse/head'

  import { isDark } from '/@src/state/darkModeState'
  import useNotyf from '/@src/composable/useNotyf'
  import sleep from '/@src/utils/sleep'
  import { AESApi } from '../api/interceptor'
  import { ADDRESS } from '../constants/paths'

  const isLoading = ref(false)
  const address = ref('')
  const router = useRouter()
  const notif = useNotyf()

  const handleLogin = async () => {
    if (!address.value.startsWith('aes')) {
      notif.warning("Address must be start with 'aes'")
    } else {
      try {
        // console.log(address.value)
        isLoading.value = true
        const data = { address: address.value, coins: ['100000000uaes'] }
        const response = await AESApi.post(ADDRESS, data)
        notif.success('Congratulation, you just received 100 uaes')
      } catch (error) {
        notif.error('Something went wrong, please contact admin')
      } finally {
        isLoading.value = false
      }
    }
  }

  useHead({
    title: 'Aeternalism Faucet',
  })
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>
      </div>
      <div class="right">
        <label class="dark-mode ml-auto">
          <input
            type="checkbox"
            :checked="!isDark"
            @change="
              (event) => {
                isDark = !event.target.checked
              }
            "
          />
          <span></span>
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
        <div class="auth-head">
          <h2>Aeternalism Faucet</h2>
          <p>Enter your address to receive testnet token</p>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleLogin">
            <div class="login-form">
              <V-Field>
                <V-Control icon="feather:user">
                  <input
                    v-model="address"
                    class="input"
                    type="text"
                    placeholder="Address"
                    autocomplete="Address"
                  />
                </V-Control>
              </V-Field>

              <!-- Submit -->
              <V-Control class="login">
                <V-Button
                  :loading="isLoading"
                  color="primary"
                  bold
                  fullwidth
                  raised
                >
                  Get token
                </V-Button>
              </V-Control>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../scss/abstracts/_variables.scss';
  @import '../scss/abstracts/_mixins.scss';
  @import '../scss/pages/auth/_auth.scss';
</style>
