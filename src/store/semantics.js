// A SemanticMapping is a relationship between fragments of a frame description
// and component ids.
//
// It has a shape like this:
// ```yaml
//   frameId: '0'
//   relationships:
//     '11-20': '3'
//     '31-37': '1'
// ```
//
// By using stringified integer ranges as object keys in the mappings
// we make sure that two different mappings can't exist for the same
// text fragment.

export class SemanticMapping {
  constructor({frame}) {
    this.frameId = frame.id
    this.reset()
  }

  reset() {
    this.relationships = {}
  }

  setRelationship({start, end, component}) {
    this.relationships[start + '-' + end] = component.id
  }

  setRelationships(relationships) {
    for (const relationship of relationships) {
      this.setRelationship(relationship)
    }
  }
}

const semantics = {
  state: {
    nextId: 0,
    semanticMappings: {}
  },
  getters: {
    frameMappings: (state) => (frame) => state.semanticMappings[frame.id],
    relationship: (state, getters) => ({frame, start, end}) => {
      const frameMappings = getters.frameMappings(frame)
      if (frameMappings) {
        return frameMappings.relationships[start + '-' + end]
      }
      return
    },
    relationships: (state, getters) => (frame) => {
      const frameMappings = getters.frameMappings(frame)
      if (frameMappings && frameMappings.relationships) {
        console.log(frameMappings.relationships)
        const relationships = []
        for (const key in frameMappings.relationships) {
          const [start, end] = key.split('-').map(n => Number(n))
          console.log(start, end)
          relationships.push({
            start,
            end,
            element: frameMappings.relationships[key]
          })
        }
        console.log(relationships)
        relationships.sort((a, b) => a.start - b.start)
        console.log(relationships)
        return relationships
      }
      return
    }
  },
  mutations: {
    offsetMappings(state, {frame, start, shiftAmount}) {
      let frameMappings = state.semanticMappings[frame.id]
      if (!frameMappings) return
      const newMappings = []
      for (const rangeStr in frameMappings.relationships) {
        const range = rangeStr.split('-').map(str => Number(str))
        for (let index in range) {
          let location = range[index]
          if (location > start) {
            location += shiftAmount
          }
          if (location < start + shiftAmount) {
            location = start + shiftAmount
          }
          location = Math.max(0, location)
          range[index] = location
        }
        const [rangeStart, rangeEnd] = range
        if (rangeStart < rangeEnd) {
          newMappings.push({
            frame,
            start: rangeStart,
            end: rangeEnd,
            component: {id: frameMappings.relationships[rangeStr]}
          })
        }
      }
      frameMappings.reset()
      frameMappings.setRelationships(newMappings)
    },
    setRelationship(state, {frame, start, end, component}) {
      let frameMappings = state.semanticMappings[frame.id]
      if (!frameMappings) {
        state.semanticMappings[frame.id] = new SemanticMapping({frame})
        frameMappings = state.semanticMappings[frame.id]
      }
      frameMappings.setRelationship({start, end, component})
    }
  }
}

export default semantics
