<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-10"><h3 class="mt-2">{{ content.title }}</h3></div>
        <div class="col-sm-2">
          <i :class="content.icon"></i>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1>{{ report[`${content.id}`] }} <span v-if="content.page == 'transaction'">ETB</span></h1>
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
    },
    report: {
      type: Number
}
  },
  
};
</script>

<style lang="scss" scoped></style>
