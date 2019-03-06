<template>
  <div class="picture-frame image" ref="dragAndDropArea" :class="{empty: !imageUrl}">
    <input type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
    <FrameImage :image-url="imageUrl" v-if="imageUrl"></FrameImage>
    <label class="chooseButton">CHOOSE FILE</label>
  </div>
</template>

<style lang="scss" scoped>
.picture-frame {
  height: 333px;
  width: 600px;
  background-color: #f2f6f7;
  border-radius: 2px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 48px;
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
  &:hover:after {
    opacity: 1;
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
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:before {
      content: "";
      display: block;
      background-size: 160px;
      margin: auto;
      object-fit: scale-down;
      background-color: #f3f6f7;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      position: absolute;
      background-image: url("../assets/icons/noImageEmptyState.png");
      background-repeat: no-repeat;
      background-position: center;
      border: 2px solid #56a8d1;
      border-radius: 2px;
    }
  }
  .chooseButton {
    font-size: 16px;
    font-weight: 800;
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 4px;
    letter-spacing: 0.5px;
    color: white;
    background-color: #56a8d1;
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 270px;
    text-align: center;
    width: 100px;
    pointer-events: none;
    border-radius: 2px;
    cursor: pointer; /* "hand" cursor */
  }

  .chooseButton:hover {
    background-color: #4b93b8;
  }

  .picture-input:focus {
    outline: none;
  }

  .picture-input:hover {
    cursor: pointer;
  }

  .picture-input:focus ~ label,
  .picture-input ~ label:hover {
    background-color: #417f9e;
    outline: none;
  }

  .picture-input ~ label {
    cursor: pointer; /* "hand" cursor */
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
