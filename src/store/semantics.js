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
  constructor({frame, start, end, component}) {
    this.frameId = frame.id
    this.relationships = {}
    if(typeof start === 'number' && typeof end === 'number' && typeof component === 'object') {
      this.setRelationship({start, end, component})
    }
  }
  setRelationship({start, end, component}) {
    this.relationships[start + '-' + end] = component.id
  }
}

const semantics = {
  state: {
    nextId: 0,
    semanticMappings: []
  },
  getters: {

  },
  mutations: {
    setRelationship(state, {frame, start, end, component}) {
      const frameMappings = state.semanticMappings.find(({frameId}) => frameId === frame.id) || new SemanticMapping({frame})
      frameMappings.setRelationship({start, end, component})
    }
  }
}

export default semantics
