<template>
  <b-list-group class="skill-list">
    <b-list-group-item>By Skill</b-list-group-item>
    <template v-for="skill in skills">
      <b-list-group-item
        v-bind:class="opened[skill.id] ? ['bg-dark', 'text-white', 'skill-expanded'] : ''"
        v-b-toggle="`${skill.id}-accordion-${id}`"
        :key="`${skill.id}-header`"
      >
        <b-row align-h="between">
          <b-col cols="10">
            <div class="mt-2"><span>{{ skill.name }}</span></div>
          </b-col>
          <b-col cols="2">
            <colored-progress-circle class="float-right" :value="skill.value" size="small" />
          </b-col>
        </b-row>
      </b-list-group-item>
      <b-collapse
        v-model="opened[skill.id]"
        :id="`${skill.id}-accordion-${id}`"
        :accordion="`skill-list-accordion-${id}`"
        class="users-list"
        role="tabpanel"
        :key="`${skill.id}-users`"
      >
        <b-list-group-item v-for="(value, user) in skill.users" :key="`${skill.id}-${user}`">
          <b-row align-h="between">
            <b-col cols="10">
              <avatar :userId="user" :url="team[user].avatar" size="40" class="mr-2" />
              <span class="ml-1">{{ team[user].name }}</span>
            </b-col>
            <b-col cols="2">
              <colored-progress-circle class="float-right" :value="value" size="small"  />
            </b-col>
         </b-row>
        </b-list-group-item>
      </b-collapse>
    </template>
  </b-list-group>
</template>

<script>
import Avatar from '../avatar';
import ColoredProgressCircle from '../progress/coloredProgressCircle';

export default {
  name: 'SkillsList',

  components: {
    Avatar,
    ColoredProgressCircle
  },

  props: {
    skills: {
      type: Array,
      required: true
    },
    team: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: false,
      default: '0'
    }
  },

  data() {
    return {
      opened: {}
    };
  }
};
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
  transition: border-bottom 0.25s linear;
  border-bottom: 1px solid $divider-color;
}

.list-group-item {
  border: none;
  border-radius: 0;
  margin: 0;
  background-color: #fafcfc;
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

  &:not(:first-child):not(:nth-last-child(2))::after {
    @extend %divider;
  }

  &:not(:first-child):not(:nth-last-child(2)).skill-expanded::after {
    @extend %divider;
    border-bottom: 1px solid #2d434d;
  }
}

.users-list > .list-group-item {
  background-color: white;
  padding: 0.75rem 2rem;

  &:not(:last-child)::after {
    @extend %divider;
    left: 5%;
    width: 90%;
  }

  &:last-child {
    border-bottom: 1px solid $divider-color;
  }
}
</style>
