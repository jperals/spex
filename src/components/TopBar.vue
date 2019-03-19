<template>
  <div class="TopBar">
    <div class="left-items">
      <router-link :to="homeUrl || '/'" class="link-back">
        <div class="HomeIcon" v-if="notAtRoot"></div>
        <div class="Logo" v-else></div>
      </router-link>
      <input type="text" class="PageTitle" v-if="story" v-model="story.title">
    </div>

    <div class="center-items">
      <h3 v-if="title" class="PageTitle">{{title}}</h3>
      <div v-else-if="story" class="NavToggle">
        <router-link :to="storyLink" class="toggle" v-if="story" :class="{active: inStoryMode, warning: componentsMissingInStory}">
          <div class="toggle-view-icon StoryIcon"></div>
          <span>Story</span>
          <!-- <span class="toggletext">Story</span> -->
        </router-link>

        <router-link :to="systemLink" class="toggle" v-if="story" :class="{warning: componentsMissingInDiagram}">
          <div class="toggle-view-icon SystemIcon"></div>
          <span>System</span>
          <!-- <span class="toggletext">System</span> -->
        </router-link>

      </div>

    </div>

    <div class="right-items">
      <!-- <div class="Divider" v-if="story"></div> -->
      <!-- <SuggestionsIndicator :number-of-suggestions="numberOfSuggestions"></SuggestionsIndicator> -->

      <slot name="right"></slot>

      <div v-if="story"
           class="toggle"
           @click="toggleComponents($event)"
           :class="{active: showComponents}"
      >
        <div class="Components"></div>
        <!-- <span class="toggletext">Components</span> -->
      </div>

      <div class="ProfileThumbnail"></div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "../common-styles/vars";
@import '../common-styles/headings';

//
// Layout

.toggle-view-icon {
  margin-right: 8px;
  margin-top: auto;
  margin-bottom: auto;
}

//
// To be sorted

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
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-image: url("../assets/icons/component-list-default.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .toggle.active .Components {
    background-image: url("../assets/icons/component-list-active.png");
  }
  .toggle.warning {
    background-color: none;
    &:after {
      position: absolute;
      top: 0;
      right: -10px;
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #7C3AFF;
      border: 1px solid #632ECB;
    }
  }

  .PageTitle {
    @extend %h3;
    border: 0 none;
    margin: auto 16px;
    border-radius: 4px;
    line-height: normal;
  }

  .NavToggle{
    display: flex;
    flex-direction: row;
    align-items: center;
    vertical-align: middle;
    margin: auto 16px;
  }
  .StoryIcon {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    background-image: url("../assets/icons/story-default.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .toggle.active .StoryIcon {
    background-image: url("../assets/icons/story-active.png");
  }

  .SystemIcon {
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    background-image: url("../assets/icons/system-default.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 16px;
  }

  .ProfileThumbnail {
    width: 36px;
    height: 36px;
    background-image: url("../assets/icons/profile-thumbnail.png");
    background-size: contain;
    border-radius: 50%;
    border: $border-default;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 16px;
  }

  .toggle.router-link-active .SystemIcon {
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

  /* toggle container */
  .toggle {
    display: flex;
    color: #68767D;
    font-weight: 700;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin: auto 8px;
    /*display: inline-block;*/
    /*z-index: 40;*/
  }

  .toggle.router-link-active {
    /*color: #ff0000;*/
    color: #031B26;


  }

  /* toggle text */
  .toggle .toggletext {
    visibility: hidden;
    width: 120px;
    margin-left: -32px;
    /*background-color: #707679;*/
    color: #fff;
    font-weight: 200;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the toggle text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the toggle text when you mouse over the toggle container */
  .toggle:not(.active):hover .toggletext {
    visibility: visible;
  }

  .toggle .toggletext::after {
    content: " ";
    position: absolute;
    bottom: 100%; /* At the top of the toggle */
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
    text-align: center;
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
    componentsMissingInDiagram() {
      const componentsMissing = this.story && store.getters.missingComponentsInStoryDiagram(this.story)
      return componentsMissing instanceof Array && componentsMissing.length
    },
    componentsMissingInStory() {
      const componentsMissing = this.story && store.getters.missingComponentsFromStory(this.story)
      return componentsMissing instanceof Array && componentsMissing.length
    },
    homeUrl() {
      return '/'
    },
    inStoryMode() {
      return this.$route && (this.$route.name === 'story' || this.$route.name === 'frame')
    },
    notAtRoot() {
      return this.$route && this.$route.name !== 'home'
    },
    showComponents() {
      return store.getters.showComponents;
    },
    storyLink() {
      if (!this.inStoryMode && this.story) {
        return '/story/' + this.story.id
      }
      return this.$route.fullPath
    },
    systemLink() {
      if (this.inStoryMode && this.story) {
        return '/system/' + this.story.id
      }
      return this.$route && this.$route.fullPath || '/'
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
