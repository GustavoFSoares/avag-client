<template>
  <AvPageSection :title="$t(`${I18N_PATH}.title`)" class="edit-user" hide-close-icon>
    <template #default>
      <div class="edit-user__wrapper">
        <div class="edit-user__form">
          <QInput class="edit-user__form-name" outlined v-model="userName"
            :label="$t(`${I18N_PATH}.form.name`)" />

          <QInput class="edit-user__form-email" outlined disable v-model="userEmail"
            :label="$t(`${I18N_PATH}.form.email`)" />
          <QInput class="edit-user__form-level" outlined disable v-model="levelName"
            :label="$t(`${I18N_PATH}.form.levelName`)" />
        </div>

        <div class="edit-user__buttons-wrapper">
          <QBtn class="edit-user__button" outline dense :label="$t(`${I18N_PATH}.buttons.cancel`)" color="primary"
            :to="{ name: 'home' }" />

          <QBtn class="edit-user__button" :label="$t(`${I18N_PATH}.buttons.submit`)" color="primary" dense
            @click="handleSubmit" />
        </div>
      </div>
    </template>
  </AvPageSection>
</template>

<script setup>
const I18N_PATH = "modules.user.pages.edit";

import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AvPageSection from "molecules/AvPageSection.vue";

const $store = useStore();
const $router = useRouter();

const userName = ref();
const userEmail = ref();
const levelName = ref();


const handleSubmit = async () => {
  await $store.dispatch("AuthModule/updateUser", {
    name: userName.value,
    email: userEmail.value,
    levelName: levelName.value,
  })
  console.warn('PARA REDIRECIONAR, olhe aqui')
  // $router.push({ name: "home" });
};


onMounted(() => {
  const storedData = $store.getters["AuthModule/userData"]
  userName.value = storedData.name
  userEmail.value = storedData.email
  levelName.value = storedData.levelName
});

</script>

<style lang="scss" scoped>
.edit-user {
  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;

    &-email {
      grid-column: 1;
    }
  }

  &__buttons-wrapper {
    margin-top: 30px;

    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 5px;

    :deep(span) {
      text-transform: initial;
    }
  }

  &__button {
    min-width: 200px;
  }

  &__submit-button {}
}
</style>
