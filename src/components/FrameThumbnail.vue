<template>
  <div class="frame-thumbnail">
    <router-link class="image-link" :to="'/frame/' + frame.id">
      <frame-image class="picture" :imageUrl="frame.imageUrl"></frame-image>
      <div class="delete-icon" @click="remove($event)"></div>
    </router-link>
    <textarea class="h3 title" v-model="frame.title" placeholder="Frame Title" rows="2" maxlength="27"></textarea>
  </div>
</template>

<style scoped lang="scss">
@import "./frame-thumbnail-size";
@import "../common-styles/vars";
.frame-thumbnail {
  display: flex;
  flex-direction: row;
  width: 100%;
  /*width: $frame-thumbnail-width;*/
  /*margin-right: 20px;*/
  position: relative;
  padding: 17px 0;
  input::placeholder {
    opacity: 0.7;
  }
  .picture {
    /*display: flex;*/
    height: $frame-thumbnail-height;
    /*width: 100%;*/
    width: $frame-thumbnail-width;
    box-sizing: border-box;
    border-radius: 8px;
  }
  .title {
    resize: none;
    /*display: flex;*/
    /* width: 100%; */

    margin: 8px 0 0 20px;
    padding: 0;
    border: none;
    /*margin-top: 8px;*/
    /*font-size: 24px;*/
    /*font-weight: 400;*/
    /*color: #00ff00;*/
    /*line-height: 32px;*/
    height: 64px;
    /*max-width: 180px;*/
    /* overflow: hidden; */
  }

  &:hover .picture,
  &:focus-within .picture {
    border-color: #099FEA;
  }

  .delete-icon {
    background-image: url("../assets/icons/button-delete-small.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 8px;
    top: 17px + 8px;
    z-index: 40;
    display: none;
    cursor: pointer;
  }

  .image-link:hover .delete-icon {
    display: block;
    z-index: 30;
  }

  textarea:focus,
  input:focus {
    outline: none;
    text-overflow: ellipsis;

  }
}
</style>

<script>
import FrameImage from "@/components/FrameImage.vue";
import store from "@/store";
export default {
  name: "frame-thumbnail",
  props: {
    frame: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    FrameImage
  },
  methods: {
    remove(event) {
      event.stopPropagation()
      event.preventDefault()
      store.dispatch('removeFrame', this.frame)
    },
  },
  watch: {
    "frame.title"(title) {
      store.dispatch("sendFrameProperties", {
        frame: this.frame,
        props: { title }
      });
    }
  }
};
</script>

<docs>
  ```jsx
  <frame-thumbnail :frame="{title: 'Frame title', 'description': 'Frame description', 'imageUrl': 'https://www.ixds.com/system/files/styles/image_in_content/private/media-images/_mg_9342.jpg?itok=q3uo0o-H'}"/>
  ```
</docs>
