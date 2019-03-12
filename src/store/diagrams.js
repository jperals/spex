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
    updateDiagramComponentPosition(state, {component, newPosition}) {
      state.diagramComponentPositions[component.id] = newPosition
    }
  },
  actions: {
    moveDiagramComponentPosition(context, {component, delta}) {
      const currentPosition = context.getters.componentDiagramPosition(component)
      const newPosition = {
        x: currentPosition.x + delta.x,
        y: currentPosition.y + delta.y
      }
      context.commit('updateDiagramComponentPosition', {component, newPosition})
    },
  }
}

export default diagrams
