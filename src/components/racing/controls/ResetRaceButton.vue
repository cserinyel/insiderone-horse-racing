<script setup lang="ts">
import Button from "../../common/button/Button.vue";
import { useRaceState } from "../../../composables/useRaceState";

const { hardResetRace } = useRaceState();
</script>

<template>
  <Button label="Reset Race" :onClick="hardResetRace" variant="border" />
</template>
