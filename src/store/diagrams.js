import {db} from './firebase'

const collection = db.collection('diagrams')

const diagrams = {
  state: {
    diagramRelationships: [],
    diagramComponentPositions: {},
    diagramGroups: []
  },
  getters: {
    componentDiagramPosition: state => component => {
      return state.diagramComponentPositions[component.id]
    },
    relationshipsFromComponent: state => component => {
      return state.diagramRelationships.filter(relationship => relationship.from === component.id)
    }
  },
  mutations: {
    addDiagramRelationship(state, relationship) {
      state.diagramRelationships.push(relationship)
    },
    updateDiagramRelationship(state, {relationship, newProperties}) {
      Object.assign(relationship, newProperties)
    },
    updateDiagramComponentPosition(state, {component, x, y}) {
      state.diagramComponentPositions[component.id] = {x, y}
    }
  }
}

export default diagrams
