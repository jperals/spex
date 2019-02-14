<template>
  <div class="TopBar">
    <router-link :to="backUrl" class="link-back">
      <div class="BackIcon" v-if="story"></div>
      <span class="PageTitle" v-if="story">{{ story.title }}</span>
      <span class="PageTitle" v-else-if="title">{{ title }}</span>
    </router-link>
    <SuggestionsIndicator :number-of-suggestions="numberOfSuggestions"></SuggestionsIndicator>
    <div class="tooltip" @click="toggleComponents" :class="{active: showComponents, warning: componentsMissing}">
      <div class="Components"></div>
      <span class="tooltiptext">Components</span>
    </div>

    <div class="Divider"></div>
    <div class="tooltip">
      <div class="StoryIcon"></div>
      <span class="tooltiptext">Story</span>
    </div>

    <div class="tooltip">
      <div class="SystemIcon"></div>
      <span class="tooltiptext">System</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.TopBar {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom: 1px solid #c6c8c9;
  width: 100%;
  height: 64px;
  overflow: inherit;

  .BackIcon {
    width: 24px;
    height: 24px;
    background-image: url("../assets/icons/back.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .Components {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-image: url("../assets/icons/components.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .tooltip.active .Components {
    background-image: url("../assets/icons/components_active.png");
  }
  .tooltip.warning {
    background-color: rgba(255, 0, 0, .1);
    &:after {
      position: absolute;
      top: 10px;
      right: 7px;
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: rgb(255, 0, 0);
    }
  }

  .PageTitle {
    font-size: 20px;
    color: #031b26;
    line-height: 32px;
    vertical-align: middle;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .StoryIcon {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    margin: auto;
    background-image: url("../assets/icons/story_Focus.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .SystemIcon {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    margin: auto;
    background-image: url("../assets/icons/system.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .Divider {
    justify-content: flex-end;
    width: 1px;
    height: 24px;
    margin: auto;
    background-image: url("../assets/icons/divider.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    margin-left: -32px;
    background-color: #707679;
    color: #fff;
    font-weight: 200;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:not(.active):hover .tooltiptext {
    visibility: visible;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%; /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #707679 transparent;
  }

  .link-back {
    display: flex;
    flex-grow: 1;
    &:not(:hover) {
      text-decoration: none;
    }
  }
}
</style>

<script>
import store from "@/store";
import SuggestionsIndicator from "@/components/SuggestionsIndicator";

export default {
  name: "top-bar",
  components: { SuggestionsIndicator },
  props: {
    numberOfSuggestions: {
      type: Number,
      default: 0
    },
    story: {
      type: Object
    },
    title: {
      type: String
    }
  },
  computed: {
    backUrl() {
      return this.story ? "/story/" + this.story.id : this.$route.fullPath;
    },
    componentsMissing() {
      return this.story && store.getters.componentsMissing(this.story)
    },
    showComponents() {
      return store.getters.showComponents;
    }
  },
  methods: {
    toggleComponents() {
      store.dispatch("toggleComponents");
    }
  }
};
</script>

<docs>
  ```jsx
  <top-bar :number-of-suggestions="2" :story="{title: 'Story Title'}"></top-bar>
  ```
</docs>
