<template>
  <div class="TopBar">
    <div class="left-items">
      <router-link :to="backUrl || '/'" class="link-back">
        <div class="HomeIcon" v-if="backUrl"></div>
        <div class="Logo" v-else></div>
      </router-link>
      <input type="text" class="PageTitle" v-if="story" v-model="story.title">
    </div>

    <div class="center-items">
      <h3 v-if="title" class="PageTitle">{{title}}</h3>
      <div v-else-if="story" class="NavToggle">
        <router-link :to="storyLink" class="tooltip" v-if="story">
          <div class="StoryIcon"></div>
          <span>Story</span>
          <!-- <span class="tooltiptext">Story</span> -->
        </router-link>

        <router-link :to="systemLink" class="tooltip" v-if="story">
          <div class="SystemIcon"></div>
          <span>System</span>
          <!-- <span class="tooltiptext">System</span> -->
        </router-link>

      </div>

    </div>

    <div class="right-items">
      <div class="Divider" v-if="story"></div>



      <SuggestionsIndicator :number-of-suggestions="numberOfSuggestions"></SuggestionsIndicator>

      <div v-if="story"
           class="tooltip"
           @click="toggleComponents($event)"
           :class="{active: showComponents, warning: componentsMissing}"
      >
        <div class="Components"></div>
        <span class="tooltiptext">Components</span>
      </div>

      <div class="ProfileThumbnail"></div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "./vars";
@import '../common-styles/headings';
.Logo{
    width: 78px;
    height: 40px;
    background-image: url("../assets/icons/logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.TopBar {
  display: flex;
  flex-direction: row;
  background-color: white;
  /*padding: 0 16px;*/
  border-bottom: $border-default;
  width: 100%;
  height: 64px;
  overflow: inherit;
  // vertical-center: middle;

  .HomeIcon {
    width: 18px;
    height: 20px;
    background-image: url("../assets/icons/home.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /*margin-left: 16px;*/
    /*margin-top: 22px;*/
    /*margin-bottom: 22px;*/
  }

  .Components {
    display:flex;
    justify-content: flex-end;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-image: url("../assets/icons/component-list-default.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .tooltip.active .Components {
    background-image: url("../assets/icons/components-active.png");
  }
  .tooltip.warning {
    background-color: none;
    &:after {
      position: absolute;
      top: 10px;
      right: 7px;
      content: "";
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #db4141;
    }
  }

  .PageTitle {
    @extend %h3;
    border: 0 none;
    padding: 5px;
    vertical-align: middle;
    margin: auto 16px;
    flex-grow: 1;
  }

  .NavToggle{
    vertical-align: middle;
    margin: auto 16px;
  }
  .StoryIcon {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    margin: auto;
    background-image: url("../assets/icons/story-idle.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tooltip.router-link-active .StoryIcon {
    background-image: url("../assets/icons/story-active.png");
  }

  .SystemIcon {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    margin: auto;
    background-image: url("../assets/icons/system-idle.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .ProfileThumbnail {
    width: 44px;
    height: 44px;
    background-image: url("../assets/icons/profile-thumbnail.png");
    background-size: contain;
    border-radius: 50%;
    border: $border-default;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 16px;
  }

  .tooltip.router-link-active .SystemIcon {
    background-image: url("../assets/icons/system-active.png");
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
    z-index: 40;
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

  .left-items, .right-items {
    display: flex;
    width: 40%;
    align-items: center;

  }
  .right-items {
     justify-content: flex-end;
     align-items: center;
  }

  .center-items {
    display: flex;
    width: 20%;
    justify-content: center;
  }

  .link-back {
    display: flex;
    align-items: center;
    padding: 0 16px;
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
  components: {SuggestionsIndicator},
  props: {
    backUrl: {
      type: String
    },
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
    componentsMissing() {
      return this.story && store.getters.componentsMissing(this.story);
    },
    showComponents() {
      return store.getters.showComponents;
    },
    storyLink() {
      if (this.story) {
        return '/story/' + this.story.id
      }
      return '#'
    },
    systemLink() {
      if (this.story) {
        return '/system/' + this.story.id
      }
      return '#'
    }
  },
  methods: {
    toggleComponents(event) {
      // Use preventDefault and stopPropagation
      // to avoid losing the text selection if the smart text field is focused.
      // https://stackoverflow.com/a/20759988
      if (store.getters.focusedElement === 'smartText') {
        event.preventDefault()
        // We need stopPropagation as well because clicking on the outer frame
        // also has side effects.
        event.stopPropagation()
        store.dispatch('setFocus', 'componentsToggle')
      }
      store.dispatch("toggleComponents");
    }
  },
  watch: {
    // Save the story title upstream when it changes in the UI
    'story.title'(title) {
      store.dispatch('sendStoryProperties', {
        story: this.story,
        props: {title}
      })
    }
  }
};
</script>

<docs>
  ```jsx
  <top-bar :number-of-suggestions="2" :story="{title: 'Story Title'}"></top-bar>
  ```
</docs>
