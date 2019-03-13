<template>
  <div class="modal" @click="modalClick" ref="background">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(100, 100, 100, 0.3);
  padding: 30px;
  display: flex;
  align-items: center;
  overflow-y: auto;
  z-index: 40;
}
</style>

<script>
export default {
  name: 'modal-dialog',
  methods: {
    modalClick(event) {
      if(event.target === this.$refs.background){
        this.$emit('modal-click')
      }
    }
  }
}
</script>
