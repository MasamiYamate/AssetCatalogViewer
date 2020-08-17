<!-- テンプレート部分 -->
<template>
<footer>
  <v-card>
      <v-footer
        absolute
        class="font-weight-medium"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Asset catalog viewer</strong>
        </v-col>
      </v-footer>
    </v-card>
</footer>
</template>