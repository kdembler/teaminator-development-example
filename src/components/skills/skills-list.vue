<template>
  <b-list-group class="skill-list">
    <b-list-group-item>{{ header }}</b-list-group-item>
    <template v-for="(skill, index) in skills">
      <b-list-group-item v-b-toggle="`skill${index}-accordion`" :key="`skill${index}-header`">
        {{ skill.name }}
      </b-list-group-item>
      <b-collapse :id="`skill${index}-accordion`" :accordion="`${header}-accordion`" role="tabpanel" :key="`skill${index}-content`">
        <b-list-group-item>Something inside</b-list-group-item>
        <b-list-group-item>Something inside</b-list-group-item>
      </b-collapse>
    </template>
  </b-list-group>
</template>

<script>
export default {
  name: 'SkillsList',
  props: {
    header: {
      type: String,
      required: false,
      default() { return 'Skills'; }
    },
    skills: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  border: none;
  margin: 0;
}

.skill-list > .list-group-item {

  &:not(:first-child) {
    cursor: pointer;
  }

  &:first-child {
    border-radius: 0;
    padding: 0.75rem 1.0rem;
    font-size: 1.10rem;
    border-bottom: 1px solid lightgray;
  }

  &:last-child {
    border-radius: 0;
  }

  &:not(:first-child):not(:nth-last-child(2))::after {
    position: absolute;
    content: "";
    left: 3%;
    bottom: 0;
    height: 1px;
    width: 94%;
    border-bottom: 1px solid lightgray;
  }
}
</style>
