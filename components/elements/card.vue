<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-10"><h4 class="mt-2">{{ content.title }}</h4></div>
        <div class="col-sm-2">
          <i :class="content.icon"></i>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1>{{ content.value }}</h1>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-sm-6">{{ content.subscript }}</div>
        <div class="col-sm-6">
          <i class="mdi mdi-arrow-up mdi-24px card-i"></i><i class="mdi mdi-arrow-down mdi-24px card-i"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    content:{
      type:Object
    }
  }
};
</script>

<style lang="scss" scoped></style>
