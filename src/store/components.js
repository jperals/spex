import {db, storageRef} from "./firebase";

const collection = db.collection('components')

const components = {
  state: {
    components: [],
    nextId: 0
  },
  getters: {
    componentById: state => id => state.components.find(component => component.id === id),
    componentDescription: (state, getters) => componentId => {
      const component = getters.componentById(componentId)
      return component.description
    },
    components: state => state.components,
    newComponent: () => ({story}) => {
      const component = {
        aliases: '',
        description: '',
        imageUrl: '',
        mandatory: false,
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
    updateComponent(state, {component, newProperties}) {
      Object.assign(component, newProperties)
    }
  },
  actions: {
    // The component will be added
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
      const imageRef = storageRef.child(`component-images/${component.id}`)
      return imageRef.put(imageFile)
        .catch(console.error)
        .then(() => imageRef.getDownloadURL())
        .then(imageUrl => context.dispatch('updateComponent', {
            component, newProperties: {imageUrl}
          }).then(() => imageUrl)
        )
    },
    loadComponents(context) {
      return collection.get()
        .catch(console.error)
        .then(documents => {
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
          components.forEach(component => {
            context.commit('addComponent', component)
          })
        })
    },
    removeComponent(context, component) {
      return collection.doc(component.id)
        .delete()
        .then(() => {
          context.commit('removeComponent', component)
        })
        .catch(console.warn)
    },
    // The component exists and will be modified.
    // The component needs to have an id
    updateComponent(context, {component, newProperties}) {
      collection.doc(component.id).set(newProperties)
        .then(() => {
          context.commit('updateComponent', {
            component,
            newProperties
          })
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
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
    }
  }
}

export default components
