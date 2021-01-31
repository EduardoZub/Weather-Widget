<template>
  <div class="alert-window">
    <div class="alert-window-content">
      <div class="alert-window-message">
        <slot name="message">
          Are  you sure <font-awesome-icon icon="question-circle" />
        </slot>
      </div>
      <div class="alert-window-actions">
        <slot name="actions">
          <button class="alert-window-button" @click="$emit('close')">Cancel</button>
          <button class="alert-window-button" @click="$emit('agree')">Yes</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AlertWindow'
}
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.alert-window {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #18456bc7;
}

.alert-window-content {
  position: relative;
  width: 90%;
  height: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $light;
  border: 2px solid $white;
}

.alert-window-message {
  font-size: 19px;
  color: $main-light;
  font-weight: bold;
}

.alert-window-actions {
  width: fit-content;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  button {
    border: none;
    font-size: 15px;
    background-color: transparent;
    text-align: center;
    margin-right: 12px;
    padding: 5px 10px;
    color: $main-light;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    font-weight: 900;

    &:hover {
      border-bottom: 1px solid $white;
    }
  }
}
</style>
