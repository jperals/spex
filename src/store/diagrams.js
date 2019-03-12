import {db} from './firebase'

const collection = db.collection('diagrams')

const diagrams = {
  state: {
    diagramRelationships: [],
    diagramItems: [],
    diagramGroups: []
  },
  getters: {
    diagramItemComponent: (state, getters) => item => {
      return getters.componentById(item.componentId)
    },
    diagramItemPosition: state => item => {
      return item.position
    },
    diagramItemsFromStory: (state, getters) => story => {
      return state.diagramItems.filter(item => item && getters.componentById(item.componentId).storyId === story.id)
    },
    relationshipsFromDiagramItem: state => component => {
      return state.diagramRelationships.filter(relationship => relationship.from === component.id)
    }
  },
  mutations: {
    addDiagramRelationship(state, relationship) {
      state.diagramRelationships.push(relationship)
    },
    addDiagramItem(state, props = {}) {
      const newItem = Object.assign({
        componentId: null,
        position: {x: null, y: null}
      }, props)
      state.diagramItems.push(newItem)
    },
    addDiagramRelationShip(state, relationship) {
      state.diagramRelationships.push(relationship)
    },
    updateDiagramRelationship(state, {relationship, newProperties}) {
      Object.assign(relationship, newProperties)
    },
    updateDiagramComponentPosition(state, {item, newPosition}) {
      item.position = newPosition
    }

  }
}

export default diagrams
