<script setup lang="ts"></script>

<template>
  <button class="btn"><slot></slot></button>
</template>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: blue;
  border: 1px solid blue;
  cursor: pointer;
}
.btn__create {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
