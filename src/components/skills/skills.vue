<template>
<b-container class="p-4 text-dark">
  <loader v-show="isLoading"></loader>
  <div v-if="!isLoading" class="d-panel">
    <b-row>
      <h2>Team Skills</h2>
    </b-row>
    <b-row align-h="between">
      <small>Discover and improve your team strongest skills</small>
      <small>Updated on <b class="text-dark">{{ formattedDate }}</b></small>
    </b-row>
    <b-row class="mt-3">
      <b-col class="p-0 pr-md-3" cols="12" md="6">
        <skills-list header="By Skill" :skills="skills" :team="team"/>
      </b-col>
      <b-col class="p-0 pl-md-3" cols="12" md="6">
        <skills-list header="By Skill" :skills="skills" :team="team" id="1"/>
      </b-col>
    </b-row>
  </div>
</b-container>
</template>

<script>
import SkillsList from './skills-list';

function parseSkills(skills) {
  const dateUpdated = new Date(skills.lastUpdated);

  const parsedSkills = Object.keys(skills.team).map(skill => {
    const skillUsers = {};
    Object.keys(skills.users).forEach(user => {
      const value = skills.users[user][skill];
      if (!value) {
        return;
      }
      skillUsers[user] = value.value;
    });

    return {
      id: skill,
      name: skills.team[skill].name,
      value: skills.team[skill].value,
      users: skillUsers
    };
  });

  return { dateUpdated, parsedSkills };
}

function parseTeam(team) {
  const parsedTeam = {};
  team.forEach(member => {
    const id = member.memberId;
    parsedTeam[id] = {
      name: member.name,
      avatar: member.avatar.links.self.href
    };
  });

  return parsedTeam;
}

export default {
  name: 'Skills',

  components: {
    SkillsList
  },

  inject: ['logger', 'alertHandler', 'skillsClient', 'teamIdentityClient'],

  data() {
    return {
      isLoading: true,
      dateUpdated: new Date(),
      skills: [],
      team: {}
    };
  },

  async created() {
    let skills = await this.skillsClient.getTeamSkillReport();
    let team = await this.teamIdentityClient.getTeamMembers();

    const { dateUpdated, parsedSkills } = parseSkills(skills, team);
    const parsedTeam = parseTeam(team);
    this.dateUpdated = dateUpdated;
    this.skills = parsedSkills;
    this.team = parsedTeam;
    this.isLoading = false;
  },

  computed: {
    formattedDate() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dev'];

      const day = this.dateUpdated.getDate();
      const month = months[this.dateUpdated.getMonth()];
      const year = this.dateUpdated.getFullYear();

      return `${month} ${day}, ${year}`;
    }
  }
};

</script>

<style lang="scss" scoped>
small {
  color: #68787f;
  font-weight: 200;
}
</style>
