<template>
  <b-list-group class="skill-list">
    <b-list-group-item>{{ header }}</b-list-group-item>
    <template v-for="skill in skills">
      <b-list-group-item
        v-bind:class="{'bg-dark': opened[skill.id], 'text-white': opened[skill.id]}"
        v-b-toggle="`${skill.id}-accordion`"
        :key="`${skill.id}-header`"
      >
        {{ skill.name }}
      </b-list-group-item>
      <b-collapse
        v-model="opened[skill.id]"
        :id="`${skill.id}-accordion`"
        :accordion="`${header}-accordion`"
        class="users-list"
        role="tabpanel"
        :key="`${skill.id}-users`"
      >
        <b-list-group-item v-for="(value, user) in skill.users" :key="`${skill.id}-${user}`">
          {{ team[user].name }}
        </b-list-group-item>
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
    },
    team: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      opened: {}
    }
  }
}
</script>

<style lang="scss" scoped>
$divider-color: #e9eff2;

%divider {
  position: absolute;
  content: "";
  left: 3%;
  bottom: 0;
  height: 1px;
  width: 94%;
  border-bottom: 1px solid $divider-color;
}

.list-group-item {
  border: none;
  margin: 0;
  background-color: #fafcfc;

  &:first-child {
    border-radius: 0;
  }

  &:last-child {
    border-radius: 0;
  }
}

.skill-list > .list-group-item {
  transition: all 0.25s linear;

  &:not(:first-child) {
    cursor: pointer;
  }

  &:first-child {
    padding: 0.75rem 1.0rem;
    font-size: 1.10rem;
    border-bottom: 1px solid $divider-color;
  }

  &:not(:first-child):not(:nth-last-child(2)):not(.bg-dark)::after {
    @extend %divider;
  }
}

.users-list > .list-group-item {
  background-color: white;
  padding: 0.75rem 1.6rem;

  &:not(:last-child)::after {
    @extend %divider;
  }

  &:last-child {
    border-bottom: 1px solid $divider-color;
  }
}
</style>
