<template>
<b-container class="p-0 text-dark">
  <loader v-show="isLoading"></loader>
  <div v-if="!isLoading" class="d-panel">
    <b-row>
      <h2>Team Skills</h2>
    </b-row>
    <b-row align-h="between">
      <small>Discover and improve your team strongest skills</small>
      <small>Updated on <b class="text-dark">Jul 29, 2018</b></small>
    </b-row>
    <b-row class="mt-3">
      <b-col class="p-0 pr-2" cols="6">
        <skills-list header="By Skill" :skills="skills"/>
      </b-col>
    </b-row>
  </div>
</b-container>
</template>

<script>
// Color circle to present progress
import ColoredProgressCircle from '../progress/coloredProgressCircle';
import SkillsList from './skills-list';

export default {
  // Name of component for registration
  name: 'Skills',

  // Register components with the vue template
  components: {
    ColoredProgressCircle,
    SkillsList
  },

  // list of injected properties, since this component Skills to a top level view referenced in routes.js, it likely won't need any, child components will have these
  props: {
    propertyName: {
      type: Object,
      required: false,
      default() { return {}; }
    }
  },

  // application level classes which handle most of the heavy lifting, these are standard javascript classes.
  inject: ['logger', 'alertHandler', 'skillsClient', 'teamIdentityClient'],

  // mutable data for the component
  data() {
    return {
      isLoading: true,
      skills: [
        {
          name: "Development"
        },
        {
          name: "Information Technology"
        },
        {
          name: "Operating Systems"
        },
        {
          name: "Networking"
        }
      ]
    };
  },

  // code executed only when the component is created, but once for each instance
  async created() {
    let skills = await this.skillsClient.getTeamSkillReport();
    let team = await this.teamIdentityClient.getTeamMembers();
    // eslint-disable-next-line
    console.log(skills, team);
    this.isLoading = false;
  },

  // Reactive properties which will update when the properties used inside these also update
  computed: {
  },

  // Defines a list of methods which can be called
  methods: {
  }
};

</script>

<style lang="scss" scoped>
small {
  color: #68787f;
  font-weight: 200;
}
</style>
