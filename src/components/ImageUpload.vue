<template>
  <div class="picture-frame image" ref="dragAndDropArea" :class="{empty: !imageUrl}">
    <input type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
    <FrameImage :image-url="imageUrl" v-if="imageUrl"></FrameImage>
    <label class="chooseButton">Upload an Image</label>
  </div>
</template>

<style lang="scss" scoped>
@import '../common-styles/vars';

.picture-frame {
  height: 333px;
  width: 600px;
  background-color: #f2f6f7;
  border-radius: 2px;
  box-sizing: border-box;
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .1);
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s ease;
  }
  &:not(.readonly):hover:after {
    opacity: 1;
    .picture-input {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  &:not(.empty):not(:hover) label {
    display: none;
  }
  .picture-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: table;
    margin: 0 auto;
    width: 100%;
    &:before {
      content: "";
      display: block;
      background-size: 160px;
      margin: auto;
      object-fit: scale-down;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      position: absolute;
      border-radius: 2px;
    }
  }
  &.readonly {
    pointer-events: none;
  }
  &:not(.readonly) {
    .picture-input {
      cursor: pointer;
    }
  }
  &.small {
    &:not(.readonly) .frame-image {
      border: 2px solid #56a8d1;
    }
    &.readonly {
      .picture-input:before,
      .frame-image {
        border: 0 none;
      }
    }
    .picture-input:before {
      background-color: lightgray;
    }
  }
  &:not(.readonly) .picture-input:before {
    border: 2px solid #56a8d1;
    border-radius: 2px;
  }
  &:not(.small) {
    margin: auto;
    margin-top: 48px;
    .picture-input:before {
      background-color: #f3f6f7;
      background-image: url("../assets/icons/noImageEmptyState.png");
      background-repeat: no-repeat;
      background-position: center;
    }
    .chooseButton {
      font-size: 16px;
      font-weight: 800;
      padding:  4px 16px;
      /*padding-top: 4px;
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 4px;*/
      color: white;
      background-color: $color-blue-highlight;
      display: block;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      top: 280px;
      text-align: center;
      width: 150px;
      pointer-events: none;
      border-radius: 4px;
      cursor: pointer; /* "hand" cursor */
      &:hover {
        background-color: #4b93b8;
      }
    }

  }

  .picture-input:focus {
    outline: none;
  }

  .picture-input:focus ~ label,
  .picture-input ~ label:hover {
    background-color: #417f9e;
    outline: none;
  }

  .picture-input ~ label {
    cursor: pointer; /* "hand" cursor */
  }

  &.small label {
    display: none;
  }

  .frame-image {
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    position: absolute;
    pointer-events: none;
  }
}


</style>

<script>
import FrameImage from '@/components/FrameImage.vue'

export default {
  name: 'image-upload',
  components: {
    FrameImage
  },
  props: {
    imageUrl: {
      type: String
    }
  },
  methods: {
    drop(event) {
      event.stopPropagation();
      event.preventDefault();
      const dt = event.dataTransfer;
      const files = dt.files;
      this.handleFiles(files);
    },
    handleFile(file) {
      this.$emit('upload', file)
    },
    handleFiles(files) {
      this.handleFile(files[0]);
    },
    handleFileSelect(event) {
      this.handleFiles(event.target.files);
    },
  },
  mounted() {
    const dragAndDropArea = this.$refs.dragAndDropArea;
    if (!dragAndDropArea) {
      console.warn("Drag and drop area not found");
      return;
    }
    dragAndDropArea.addEventListener("dragenter", dragenter, false);
    dragAndDropArea.addEventListener("dragover", dragover, false);
    dragAndDropArea.addEventListener("drop", this.drop, false);
  }
}

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

</script>
