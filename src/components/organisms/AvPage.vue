<template>
  <section
    :class="[
      'av-page',
      { 'av-page--no-header': noHeader },
      { 'av-page--no-content-padding': noContentPadding },
    ]"
  >
    <header
      :class="[
        'av-page-header',
        `bg-${headerBackground}`,
        { 'av-page-header--column': columnHeader },
      ]"
      v-if="!noHeader"
    >
      <div class="av-page-header__title-wrapper" v-if="title || goBackRoute">
        <QBtn
          v-if="goBackRoute"
          class="av-page-header__back-button"
          :to="goBackRoute"
          icon="fas fa-arrow-left-long"
          size="md"
          padding="xs"
          flat
          text-color="red"
          :label="title"
        />

        <h1 v-else class="av-page-header__title">{{ title }}</h1>
      </div>

      <div class="av-page-header__content">
        <slot name="header" />
      </div>
    </header>

    <main class="av-page-content">
      <div class="av-page-content__container">
        <slot name="default" />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "AvPage",
  props: {
    title: {
      type: String,
      default: null,
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    columnHeader: {
      type: Boolean,
      default: false,
    },
    noContentPadding: {
      type: Boolean,
      default: false,
    },
    goBackRoute: {
      type: Object,
      default: null,
    },
    headerBackground: {
      type: String,
      default: "transparent",
    },
  },
};
</script>

<style lang="scss" scoped>
.av-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  &--no-content-padding & {
    &-content {
      &__container {
        padding: initial;
      }
    }
  }

  &-header {
    display: flex;
    min-height: 53px;

    &--column {
      flex-direction: column;
    }

    &__title {
      font-size: 15px;
      color: $text-color-1;
      font-weight: $font-weight-normal;

      &-wrapper {
        padding: 0 30px;

        display: flex;
        align-items: center;
        gap: 15px;
      }
    }

    &__back-button {
      width: max-content;
      color: $text-color-4 !important;

      :deep() {
        .q-btn__content {
          font-size: 18px;
          line-height: 18px;
          text-transform: initial;

          span {
            font-weight: $font-weight-semibold;
          }
        }

        .q-icon {
          font-size: 20px;
        }
      }
    }

    &__content {
      flex-grow: 1;

      :deep {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  &-content {
    height: 100%;
    padding: 4px 0;
    position: relative;

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(#010203, 60%);
      border-radius: 10px;
    }

    &__container {
      padding: 20px 40px;
      padding-bottom: 80px;

      @media (max-width: $breakpoint-mobile) {
        padding: 20px 10px;
      }
    }
  }
}
</style>
