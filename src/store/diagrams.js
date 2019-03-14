import {db} from './firebase'

const diagramItemsCollection = db.collection('diagram-items')

function initialState() {
  return {
    diagramRelationships: [],
    diagramItems: [],
    diagramGroups: []
  }
}

const diagrams = {
  state: initialState(),
  getters: {
    // Returns which components are included in the diagram of a story
    componentsFromStoryDiagram: (state, getters) => story => {
      return getters.diagramItemsFromStory(story).map(item => getters.componentById(item.componentId))
    },
    diagramItemById: state => id => state.diagramItems.find(item => item.id === id),
    diagramItemComponent: (state, getters) => item => {
      return getters.componentById(item.componentId)
    },
    diagramItemPosition: state => item => {
      return item.position
    },
    diagramItemsFromStory: (state, getters) => story => {
      return state.diagramItems.filter(item => item && typeof item.componentId === 'string' && getters.componentById(item.componentId).storyId === story.id)
    },
    diagramRelationshipsFromItem: state => item => {
      return state.diagramRelationships.filter(relationship => relationship.from === item.id)
    },
    diagramRelationshipsFromStory: (state, getters) => story => {
      const relationships = []
      const items = getters.diagramItemsFromStory(story)
      for (const item of items) {
        const itemRelationships = getters.diagramRelationshipsFromItem(item)
        for (const relationship of itemRelationships) {
          relationships.push(relationship)
        }
      }
      return relationships
    },
    missingComponentsInStoryDiagram: (state, getters) => story => {
      const storyComponents = getters.componentsFromStory(story)
      const diagramComponentIds = getters.componentsFromStoryDiagram(story).map(component => component.id)
      return storyComponents.filter(component => !(diagramComponentIds.includes(component.id)))
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
    reset(state) {
      Object.assign(state, initialState())
    },
    updateDiagramItem(state, {item, newProperties}) {
      Object.assign(item, newProperties)
    },
    updateDiagramItemPosition(state, {item, newPosition}) {
      item.position = newPosition
    },
    updateDiagramRelationship(state, {relationship, newProperties}) {
      Object.assign(relationship, newProperties)
    }
  },
  actions: {
    loadDiagrams(context) {
      return diagramItemsCollection.get()
        .catch(console.error)
        .then(documents => {
          documents.forEach(document => {
            const diagramItem = Object.assign({
                id: document.id
              },
              document.data()
            )
            context.commit('addDiagramItem', diagramItem)
          })
        })
    },
    reset(context) {
      return context.commit('reset')
    },
    updateDiagramItem(context, {item, newProperties}) {
      return diagramItemsCollection
        .doc(item.id)
        .update(newProperties)
        .then(() => {
          context.commit('updateDiagramItem', {
            item,
            newProperties
          })
        })
    }
  }
}

export default diagrams
