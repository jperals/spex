import frames from "./frames";

export default class Frame {
  constructor(props) {
    this.id = frames.state.frames.length.toString()
    if(props && props.story) {
      this.storyId = props.story.id
    }
    Object.assign(this, props)
  }
  addImage(file) {
    if(!(file.type.startsWith('image/'))) {
      console.warn('File is not an image')
      return
    }
    this.image = file
  }
}
