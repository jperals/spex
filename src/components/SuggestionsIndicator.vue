<template>
  <div class="suggestions-indicator" v-if="numberOfSuggestions > 0">
    {{ numberOfSuggestions }} {{ suggestionsText }}
  </div>
</template>

<style>
  .suggestions-indicator{
    height: 24px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
    color: #56A8D1;
    letter-spacing: 0.33px;
    background-color: #EEF6FA;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid;
    border-radius: 24px;
    border-width: 2px;
  }

</style>

<script>
  export default {
    name: 'suggestions-indicator',
    props: {
      numberOfSuggestions: {
        type: Number,
        default: 0
      }
    },
    computed: {
      suggestionsText() {
        return this.numberOfSuggestions === 1 ? 'suggestion' : 'suggestions'
      }
    }
  }
</script>

<docs>

  Shows the number of suggestions generated by the system.

  ```jsx
  <suggestions-indicator :number-of-suggestions="2"></suggestions-indicator>
  ```

</docs>
