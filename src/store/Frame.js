import frames from "./frames";

export default class Frame {
  constructor(story) {
    this.id = frames.state.frames.length
    if(story) {
      this.storyId = story.id
    }
  }
}
