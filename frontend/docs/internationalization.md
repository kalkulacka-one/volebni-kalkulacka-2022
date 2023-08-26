# Internationalization

## Frontend

Volební kalkulačka is using [Vue I18n](https://vue-i18n.intlify.dev) plugin for internationalization.

### How to create translations

Translation strings are located in JSON files at `/src/i18n/locales`. The name of the file is the language code defined by ISO 639-1.

The JSON structure mimics the file structure: the object structure should be the same as the file path the translation is used in.

For example for sign in page with strings located at `/src/routes/profile/AuthPageVue.vue`, the JSON structure should look like the following:

```json
{
  "routes": {
    "profile": {
      "AuthPageVue": {
        "sign-in-button-label": "Přihlásit se"
      }
    }
  }
}
```

Or like this for strings used in components:

```json
{
  "components": {
    "design-system": {
      "style": {
        "LogoComponent": {
          "logotype-text": "Volební kalkulačka"
        }
      }
    }
  }
}
```

The actual key of the translation should be always a kebab-cased description of the string placement in English.

### How to use translations

To use a translation in a page or component, simply import the plugin and configure the translate function:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
```

And then use the translate function instead of strings in the code or a template:

```vue
<template>
  <ButtonComponent …>
    {{ $t('routes.profile.AuthPageVue.sign-in') }}
  </ButtonComponent>
</template>
```
