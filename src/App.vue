<template>
  <v-app>
    <template>
      <router-view />
    </template>
    <notifications group="foo" position="top center" />
  </v-app>
</template>


<script>
  export default {
    name: 'App',
  }
</script>
