<script setup lang="ts">
/**
 * LanguageSwitcher Component
 *
 * Allows users to switch between available languages.
 */

const { locale, locales, setLocale } = useI18n()

/**
 * Available locales with display names
 */
const availableLocales = computed(() =>
  locales.value.filter((l) =>
    typeof l !== 'string' && 'name' in l
  ) as Array<{ code: 'en' | 'de'; name: string }>
)

/**
 * Current locale value for the select element
 */
const currentLocale = computed({
  get: () => locale.value,
  set: (value: string) => setLocale(value as 'en' | 'de')
})
</script>

<template>
  <div class="language-switcher">
    <select
      v-model="currentLocale"
      class="bg-white border border-secondary-200 rounded-lg px-2 py-1 text-sm text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
    >
      <option
        v-for="loc in availableLocales"
        :key="loc.code"
        :value="loc.code"
      >
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>
