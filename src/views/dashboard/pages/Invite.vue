<template>
  <h1>Please wait</h1>
</template>

<script>
export default {
  mounted() {
    this.$router.push(`/login?inviteId=${this.$route.params.inviteId}`);
  },
};
</script>
