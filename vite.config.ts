import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueSetupExtnd from 'vite-plugin-vue-setup-extend'
const config: UserConfig = {
  plugins: [
    Vue(),vueSetupExtnd()
  ],server:{host:'0.0.0.0'}
}

export default config
