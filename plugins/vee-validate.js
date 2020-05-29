import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

const rules = {
  required,
}
Object.keys(rules).forEach((name) => {
  extend(name, rules[name])
})
const components = {
  ValidationObserver,
  ValidationProvider,
}

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name])
})
