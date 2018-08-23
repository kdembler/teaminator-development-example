<template>
<b-container class="p-0">
  <loader v-show="isLoading"></loader>
  <div v-if="!isLoading" class="d-panel">
    <h2>Team Skills</h2>
  </div>
</b-container>
</template>

<script>
// Color circle to present progress
import ColoredProgressCircle from '../progress/coloredProgressCircle';


export default {
  // Name of component for registration
  name: 'Skills',

  // Register components with the vue template
  components: {
    ColoredProgressCircle
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
      isLoading: true
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
</style>
