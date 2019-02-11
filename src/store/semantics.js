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

  // `start` and `end` define a forbidden range.
  // Modify (or remove) all other ranges so as to not fall within it.
  fixOverlaps(forbiddenRangeStart, forbiddenRangeEnd) {
    for (const rangeStr in this.relationships) {
      const relationship = this.relationships[rangeStr]
      const [thisStart, thisEnd] = rangeStr.split('-').map(s => Number(s))
      let newStart = thisStart
      let newEnd = thisEnd
      // Delete ranges that fall fully inside of the forbidden range,
      // or if they fully contain the forbidden range.
      if (forbiddenRangeStart <= thisStart && thisEnd <= forbiddenRangeEnd
        || thisStart <= forbiddenRangeStart && forbiddenRangeEnd <= thisEnd) {
        delete this.relationships[rangeStr]
        continue
      }
      // This range starts at the left of the forbidden range;
      // make sure it also ends at the left.
      if (thisStart <= forbiddenRangeStart) {
        newEnd = Math.min(thisEnd, forbiddenRangeStart)
      }
      // This range ends at the right of the forbidden range;
      // make sure it also starts at the right.
      if (forbiddenRangeEnd <= thisEnd) {
        newStart = Math.max(thisStart, forbiddenRangeEnd)
      }
      // Unless nothing changed ...
      if (newStart === thisStart && newEnd === thisEnd) {
        continue
      }
      // ... delete the old key ...
      delete this.relationships[rangeStr]
      // .. to insert the old object in the new key.
      const newKey = [newStart, newEnd].join('-')
      this.relationships[newKey] = relationship
    }
  }

  reset() {
    this.relationships = {}
  }

  setRelationship({start, end, component}) {
    this.fixOverlaps(start, end)
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
    changeTracker: 1,
    nextId: 0,
    semanticMappings: {}
  },
  getters: {
    semanticsChangeTracker: (state) => state.changeTracker,
    frameMappings: (state) => (frame) => {
      if (frame) {
        return state.semanticMappings[frame.id]
      } else {
        return state.semanticMappings
      }
    },
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
        const relationships = []
        for (const key in frameMappings.relationships) {
          const [start, end] = key.split('-').map(n => Number(n))
          relationships.push({
            start,
            end,
            element: frameMappings.relationships[key]
          })
        }
        relationships.sort((a, b) => a.start - b.start)
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
          if (start < location) {
            location += shiftAmount
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
      state.changeTracker += 1
    }
  }
}

export default semantics
