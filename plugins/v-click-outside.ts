import Vue from 'vue'

Vue.directive('click-outside', {
  bind(el: any, binding) {
    const ourClickEventHandler = (event: { target: any }) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event)
      }
    }

    el.__vueClickEventHandler__ = ourClickEventHandler

    document.addEventListener('click', ourClickEventHandler)
  },

  unbind(el: any) {
    document.removeEventListener('click', el.__vueClickEventHandler__)
  },
})
