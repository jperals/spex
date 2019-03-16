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
      if (state.diagramRelationships instanceof Array) {
        return state.diagramRelationships.filter(relationship => relationship.from.itemId === item.id)
      } else {
        return []
      }
    },
    diagramRelationshipsToItem: state => item => {
      if (state.diagramRelationships instanceof Array) {
        return state.diagramRelationships.filter(relationship => relationship.to.itemId === item.id)
      } else {
        return []
      }
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
        position: {x: 35, y: 35}
      }, props)
      state.diagramItems.push(newItem)
    },
    addDiagramRelationship(state, relationship) {
      state.diagramRelationships.push(relationship)
    },
    removeDiagramItem(state, item) {
      const index = state.diagramItems.findIndex(diagramItem => diagramItem.id === item.id)
      if (index === -1) {
        console.warn(`Diagram with id ${item.id} not found.`)
        return
      }
      state.diagramItems.splice(index, 1)
    },
    removeDiagramRelationship(state, relationship) {
      const index = state.diagramRelationships.findIndex(diagramRelationship => diagramRelationship.id === relationship.id)
      if (index === -1) {
        console.warn(`Relationship with id ${relationship.id} not found.`)
        return
      }
      state.diagramRelationships.splice(index, 1)
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
    addDiagramItem(context, item) {
      diagramItemsCollection.add(item)
        .then(docRef => {
          context.commit('addDiagramItem', Object.assign(item, {id: docRef.id}))
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    addDiagramRelationship(context, relationship) {
      diagramRelationshipsCollection.add(relationship)
        .then(docRef => {
          context.commit('addDiagramRelationship', Object.assign(relationship, {id: docRef.id}))
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        })
    },
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
    removeDiagramItem(context, item) {
      return context.dispatch('removeDiagramRelationshipsFromItem', item)
        .then(() => context.dispatch('removeDiagramRelationshipsToItem', item))
        .then(() => diagramItemsCollection.doc(item.id).delete())
        .then(() => context.commit('removeDiagramItem', item))
        .catch(console.warn)
    },
    removeDiagramRelationship(context, relationship) {
      return diagramRelationshipsCollection.doc(relationship.id)
        .delete()
        .then(() => {
          context.commit('removeDiagramRelationship', relationship)
        })
        .catch(console.warn)
    },
    removeDiagramRelationshipsFromItem(context, item) {
      const relationships = context.getters.diagramRelationshipsFromItem(item)
      return Promise.all(relationships.map(relationship => context.dispatch('removeDiagramRelationship', relationship)))
    },
    removeDiagramRelationshipsToItem(context, item) {
      const relationships = context.getters.diagramRelationshipsToItem(item)
      return Promise.all(relationships.map(relationship => context.dispatch('removeDiagramRelationship', relationship)))
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
