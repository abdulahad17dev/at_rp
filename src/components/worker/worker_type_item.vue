<template>
  <div class="row">
    <div class="col">{{ worker_types }}</div>
  </div>
</template>

<script>
export default {
  name: "WorkerTypeItem",
  props: ["worker_types"],
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
