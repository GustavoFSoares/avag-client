<template>
  <button
    class="menu-button"
    :class="{
      'menu-button--active': isMenuOpen,
    }"
    @click="$emit('clicked')"
  >
    <div class="menu-button__content">
      <span>Menu</span>
    </div>
  </button>
</template>

<script>
export default {
  name: "OpenMenuButton",
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    isMenuOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-button {
  width: 100%;
  height: 100%;
  background: $primary;
  padding: 2px;

  &__content {
    position: relative;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    overflow: hidden;
  }

  span {
    width: 100%;
    width: 18px;
    transition: all;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;
    text-indent: -9999px;
    position: absolute;
    border-radius: 4px;
    height: 4px;
    left: 0;
    color: $white;
    background: $white;

    &::before,
    &::after {
      content: "";
      transition: all;
      transition-duration: 300ms;
      transition-timing-function: ease-in;
      position: absolute;
      background: $white;
      color: $white;
      border-radius: 4px;
      height: 4px;
      left: 0;
    }

    &::before {
      width: 26px;
      transform: translateY(-10px);
    }

    &::after {
      width: 12px;
      transform: translateY(10px);
    }
  }

  &--active {
    span {
      left: 50%;
      background: transparent;
      transform: translateX(-50%);
      width: 80%;

      &::before,
      &::after {
        width: 100%;
        min-width: 100%;
        max-width: 22px;
        transform: translate(-50%, -50%);
      }

      &::before {
        transform: rotate(-45deg);
      }

      &::after {
        transform: rotate(45deg);
      }
    }
  }
}
</style>
