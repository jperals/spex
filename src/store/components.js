import {db, storageRef} from "./firebase";
import uniqid from 'uniqid'

const collection = db.collection('components')

function initialState() {
  return {
    components: [],
    nextId: 0
  }
}

const components = {
  state: initialState(),
  getters: {
    componentById: state => id => state.components.find(component => component.id === id),
    componentDescription: (state, getters) => componentId => {
      const component = getters.componentById(componentId)
      return component.description
    },
    components: state => state.components,
    newComponent: () => ({story}) => {
      // Define all properties here
      // so that the app correctly reacts to changes
      const component = {
        aliases: '',
        description: '',
        imageUrl: '',
        mandatory: false,
        name: '',
        title: '',
      }
      if (story && typeof story.id === 'string') {
        component.storyId = story.id
      }
      return component
    }
  },
  mutations: {
    addComponent(state, component) {
      state.components.push(component)
    },
    removeComponent(state, component) {
      const index = state.components.findIndex(item => item.id === component.id)
      if (index === -1) {
        console.warn(`Component with id ${component.id} not found.`)
        return
      }
      state.components.splice(index, 1)
    },
    resetComponents(state) {
      Object.assign(state, initialState())
    },
    updateComponent(state, {component, newProperties}) {
      Object.assign(component, newProperties)
    },
    updateComponents(state, components) {
      state.components = components
    }
  },
  actions: {
    addComponent(context, component) {
      collection.add(component)
        .then(docRef => {
          context.commit('addComponent', Object.assign(component, {id: docRef.id}))
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    addImageToComponent(context, {component, imageFile}) {
      const refId = uniqid()
      const imageRef = storageRef.child(`component-images/${refId}`)
      return imageRef.put(imageFile)
        .catch(console.error)
        .then(() => imageRef.getDownloadURL())
        .then(imageUrl => context.dispatch('updateComponent', {
            component, newProperties: {imageUrl}
          }).then(() => imageUrl)
        )
    },
    loadComponents(context) {
      return context.dispatch('resetComponents')
        .then(() => {
          collection.get()
            .catch(console.error)
            .then(documents => {
              return context.dispatch('loadComponentsFromDatabaseDocuments', documents)
            })
        })
    },
    loadComponentsFromDatabaseDocuments(context, documents) {
      const components = []
      documents.forEach(document => {
        const component = document.data()
        component.id = document.id
        components.push(component)
      })
      components.sort((a, b) => {
        if (a.name < b.name) return -1
        if (b.name < a.name) return 1
        return 0
      })
      context.commit('updateComponents', components)
    },
    removeComponent(context, component) {
      return collection.doc(component.id)
        .delete()
        .then(() => {
          context.commit('removeComponent', component)
        })
        .catch(console.warn)
    },
    resetComponents(context) {
      context.commit('resetComponents')
    },
    // The component might exist or not.
    // Add to the components if it's not there;
    // modify the corresponding component if we already have it
    saveComponent(context, properties) {
      const matchingComponent = context.getters.componentById(properties.id)
      if (matchingComponent) {
        context.dispatch('updateComponent', {
          component: matchingComponent,
          newProperties: properties
        })
      } else {
        context.dispatch('addComponent', properties)
      }
    },
    updateComponent(context, {component, newProperties}) {
      if (component.id) {
        // If the component exists it will be modified upstream.
        return collection
          .doc(component.id)
          .set(newProperties,
            {
              merge: true
            })
          .then(() => {
            context.commit('updateComponent', {
              component,
              newProperties
            })
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          })
      } else {
        // Otherwise, it is a new component which has not been saved yet
        // and doesn't have an id. Just update the in-memory instance.
        context.commit('updateComponent', {
          component,
          newProperties
        })
      }
    }
  }
}

export default components
