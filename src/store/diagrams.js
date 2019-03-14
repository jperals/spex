import {db} from './firebase'

const diagramItemsCollection = db.collection('diagram-items')
const diagramRelationshipsCollection = db.collection('diagram-relationships')

const diagrams = {
  state: {
    diagramRelationships: [],
    diagramItems: [],
    diagramGroups: []
  },
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
      return state.diagramRelationships.filter(relationship => relationship.from.itemId === item.id)
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
    addDiagramItem(state, props = {}) {
      const newItem = Object.assign({
        componentId: null,
        position: {x: null, y: null}
      }, props)
      state.diagramItems.push(newItem)
    },
    addDiagramRelationship(state, relationship) {
      state.diagramRelationships.push(relationship)
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
    loadDiagramItems(context) {
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
    loadDiagramRelationships(context) {
      return diagramRelationshipsCollection.get()
        .catch(console.error)
        .then(documents => {
          documents.forEach(document => {
            const relationship = Object.assign({
              id: document.id
            },
              document.data()
            )
            context.commit('addDiagramRelationship', relationship)
          })
        })
    },
    loadDiagrams(context) {
      return Promise.all([
        context.dispatch('loadDiagramItems'),
        context.dispatch('loadDiagramRelationships')
      ])
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
