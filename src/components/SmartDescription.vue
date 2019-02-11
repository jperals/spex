<template>
  <div class="smart-text">
    <div class="rich-text">
      <span
        class="formatted-chunk"
        :class="formattedClass(chunk)"
        v-for="(chunk, index) in formattedChunks"
        :key="index"
      >{{chunk.text}}</span>
    </div>
    <textarea
      ref="textarea"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      @click="updateSelection"
      :placeholder="placeholder"
      rows="4"
      maxlength="295"
    ></textarea>
  </div>
</template>

<style lang="scss">
$fontSize: 20px;
.smart-text {
  font-weight: 400;
  width: 590px;
  color: #031b26;
  margin-top: 8px;
  line-height: 28px;
  position: relative;
  .rich-text {
    position: absolute;
    color: transparent;
    left: 0;
    right: 0;
    white-space: pre-wrap;
    line-height: 28px;
    .formatted-chunk {
      font-size: $fontSize;
      &.linked {
        background-color: #e3dfff;
        &:hover {
          background-color: #bfbbd6;
        }
      }
    }
  }
  textarea {
    background: transparent;
    border: none;
    font-family: "Titillium Web";
    font-size: $fontSize;
    line-height: 28px;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: relative;
    resize: none;
    text-overflow: ellipsis;
    width: 100%;
  }
}
</style>

<script>
import { smartDiff } from "@/text-utils";
import store from "@/store";

export default {
  name: "smart-description",
  data() {
    return {
      changeTracker: 1
    };
  },
  props: {
    frame: {
      type: Object
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  computed: {
    formattedChunks() {
      const chunks = [];
      let currentIndex = 0;
      const frameRelationships =
        this.changeTracker && store.getters.relationships(this.frame);
      if (!frameRelationships) {
        return;
      }
      for (const relationship of frameRelationships) {
        if (currentIndex < relationship.start) {
          chunks.push({
            text: this.value.substring(currentIndex, relationship.start)
          });
        }
        chunks.push({
          link: relationship.element,
          text: this.value.substring(relationship.start, relationship.end)
        });
        currentIndex = relationship.end;
      }
      if (currentIndex < this.value.length) {
        chunks.push({
          text: this.value.substring(currentIndex)
        });
      }
      return (
        this.changeTracker && store.getters.semanticsChangeTracker && chunks
      );
    }
  },
  methods: {
    formattedClass(chunk) {
      return chunk.link ? "linked" : undefined;
    },
    toggleSelection(value) {
      console.log(value)
    },
    updateSelection(event) {
      event.stopPropagation()
      this.changeTracker += 1;
      const textarea = this.$refs.textarea;
      store.commit('toggleSelection', true)
      store.commit("setSelection", {
        start: textarea.selectionStart,
        end: textarea.selectionEnd
      });
    }
  },
  watch: {
    value(newText, oldText) {
      this.changeTracker += 1;
      const { start, end, shiftAmount } = smartDiff(oldText, newText);
      store.commit("offsetMappings", {
        frame: this.frame,
        start,
        end,
        shiftAmount
      });
    }
  }
};
</script>

<docs>
  ```jsx
  <smart-description
      :value="'This is a smart description where text fragments can be related to components in the system'"
      :placeholder="'Placeholder'"/>
  ```
</docs>
