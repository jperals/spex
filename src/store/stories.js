import {db, firebase} from '@/store/firebase'

const collection = db.collection('stories')

const stories = {
  state: {
    stories: []
  },
  getters: {
    componentsFromStory: (state, getters) => story => {
      return getters.components.filter(component => component.storyId === story.id)
    },
    // Returns whether there are mandatory components to be linked in the story.
    // (i.e, a boolean, not a list of the missing components)
    componentsMissing: (state, getters) => story => {
      const componentsFromStory = getters.componentsFromStory(story)
      const linkedComponents = getters.linkedComponents(story).map(component => component.id)
      for (const component of componentsFromStory) {
        if (component.mandatory && !(linkedComponents.includes(component.id))) {
          return true
        }
      }
      return false
    },
    framesFromStory: (state, getters) => (story) => {
      const frames = []
      if (story && story.frames instanceof Array) {
        for (const frameId of story.frames) {
          try {
            const frame = getters.frameById(frameId)
            if (typeof frame !== 'undefined') {
              frames.push(frame)
            }
          } catch (e) {
            console.warn(e)
          }
        }
      }
      return frames
    },
    linkedComponents: (state, getters) => story => {
      const components = []
      const parser = new DOMParser()
      const linkedIds = new Set()
      for (const frame of getters.framesFromStory(story)) {
        const element = parser.parseFromString(frame.description, 'text/html')
        const links = element.querySelectorAll('.smart-link')
        for (const link of links) {
          const id = link.getAttribute('link-id')
          if (typeof id === 'string') {
            linkedIds.add(id)
          }
        }
      }
      for (const id of linkedIds) {
        const component = getters.componentById(id)
        if (typeof component === 'object') {
          components.push(component)
        }
      }
      return components
    },
    missingComponentsFromStory: (state, getters) => story => {
      const storyComponents = getters.componentsFromStory(story)
      const mandatoryStoryComponents = storyComponents.filter(component => component.mandatory)
      const linkedComponentIds = getters.linkedComponents(story).map(component => component.id)
      return mandatoryStoryComponents.filter(component => !(linkedComponentIds.includes(component.id)))
    },
    stories: state => state.stories,
    storyById: (state, getters) => id => getters.stories.find(story => story.id === id),
    storyFromComponent: (state, getters) => component => {
      if (typeof component === 'object') {
        return getters.stories.find(story => story.id === component.storyId)
      }
    },
    storyFromDiagramItem: (state, getters) => item => {
      if (typeof item === 'object') {
        const component = getters.componentById(item.componentId)
        if (typeof component === 'object') {
          return getters.storyFromComponent(component)
        }
      }
    },
    storyFromDiagramRelationship: (state, getters) => relationship => {
      if (typeof relationship === 'object') {
        const firstItem = getters.diagramItemById(relationship.from.itemId)
        if (typeof firstItem === 'object') {
          return getters.storyFromDiagramItem(firstItem)
        }
      }
    },
    storyFromFrame: (state, getters) => (frame) => {
      if (typeof frame === 'object') {
        return getters.stories.find(story => story.id === frame.storyId)
      }
    }
  },
  mutations: {
    addFrameToStory(state, {story, frame}) {
      story.frames.push(frame.id)
    },
    addStory(state, story) {
      state.stories.push(story)
    },
    forceStoryUpdate(state, story) {
      state.changeTracker += 1
      const index = state.stories.findIndex(item => item.id === story.id)
      if (index === -1) {
        console.warn('Story with id', story.id, 'not found.')
        return
      }
      state.stories[index] = Object.assign({}, story, {frames: [].concat(story.frames)})
    },
    removeStory(state, story) {
      const index = state.stories.findIndex(item => item.id === story.id)
      if (index === -1) {
        console.warn('Story with id', story.id, 'not found.')
        return
      }
      state.stories.splice(index)
    },
    updateLinkedComponents(state) {
      const components = []
      const parser = new DOMParser()
      for (const story of state.stories) {
        for (const frame of story.frames) {
          const element = parser.parseFromString(frame.description, 'text/html')
          const links = element.querySelectorAll('.smart-link')
          for (const link of links) {
            const id = link.getAttribute('link-id')
            if (typeof id === 'string') {
              components.push(id)
            }
          }
        }
      }
      state.linkedComponents = components
    },
    updateStories(state, stories) {
      state.stories = stories
    },
    updateStory(state, {story, props}) {
      Object.assign(story, props)
    }
  },
  actions: {
    addComponent(context, component) {
      const story = context.getters.storyFromComponent(component)
      if (story) {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    addDiagramItem(context, item) {
      const story = context.getters.storyFromDiagramItem(item)
      if (typeof story === 'object') {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    addDiagramRelationship(context, relationship) {
      const story = context.getters.storyFromDiagramRelationship(relationship)
      if (typeof story === 'object') {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    addNewStory(context) {
      return context.dispatch('addStory', {
        createdTime: new Date(),
        description: '',
        frames: [],
        modifiedTime: new Date(),
        title: ''
      })
    },
    addStory(context, story) {
      return collection.add(story)
        .then(docRef => {
          const id = docRef.id
          context.commit('addStory', Object.assign(story, {id}))
          return id
        })
        .catch(console.warn)
    },
    addFrameToStory(context, {story, frame}) {
      const modifiedTime = new Date()
      return collection.doc(story.id)
        .update({
          frames: firebase.firestore.FieldValue.arrayUnion(frame.id),
          modifiedTime
        })
        .catch(console.error)
        .then(() => {
          context.commit('addFrameToStory', {frame, story})
          context.commit('updateStory', {
            story,
            props: {
              modifiedTime
            }
          })
        })
    },
    loadStories(context) {
      return collection.get()
        .then(documents => {
          context.dispatch('loadStoriesFromDatabaseDocuments', documents)
        })
        .catch(console.error)
    },
    loadStoriesFromDatabaseDocuments(context, documents) {
      const stories = []
      documents.forEach(document => {
        const story = Object.assign({id: document.id}, document.data())
        stories.push(story)
      })
      context.commit('updateStories', stories)
    },
    removeComponent(context, component) {
      const story = context.getters.storyFromComponent(component)
      if (story) {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    removeDiagramItem(context, item) {
      const story = context.getters.storyFromDiagramItem(item)
      if (typeof story === 'object') {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    removeDiagramRelationship(context, relationship) {
      const story = context.getters.storyFromDiagramRelationship(relationship)
      if (typeof story === 'object') {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    removeFrame(context, frame) {
      const story = context.getters.storyFromFrame(frame)
      if (story) {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    sendFrameProperties(context, {frame}) {
      const story = context.getters.storyFromFrame(frame)
      if (story) {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    // Update story properties remotely without waiting for an answer.
    // (Used in text fields where we want an immediate reaction)
    sendStoryProperties(context, {story, props}) {
      return collection.doc(story.id).set(
        props,
        {
          merge: true
        }
      ).then(() => {
        context.commit('updateStory', {
          story,
          props: {
            modifiedTime: new Date()
          }
        })
      })
    },
    updateComponent(context, {component}) {
      const story = context.getters.storyFromComponent(component)
      if (story) {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    updateDiagramItem(context, {item}) {
      const story = context.getters.storyFromDiagramItem(item)
      if (typeof story === 'object') {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    updateFrame(context, {frame}) {
      const story = context.getters.storyFromFrame(frame)
      if (story) {
        return context.dispatch('updateStoryModifiedTime', story)
      }
    },
    updateStory(context, {story, props}) {
      const propsWithModifiedTime = Object.assign({}, props, {modifiedTime: new Date()})
      return collection.doc(story.id).set(
        propsWithModifiedTime,
        {
          merge: true
        }
      )
        .then(() => {
          context.commit('updateStory', {
            story,
            props: propsWithModifiedTime
          })
        })
    },
    updateStoryModifiedTime(context, story) {
      const modifiedTime = new Date()
      return collection.doc(story.id).set(
        {
          modifiedTime
        },
        {
          merge: true
        }
      )
        .then(() => {
          context.commit('updateStory', {
            story,
            props: {
              modifiedTime
            }
          })
        })
    }
  }
}

export default stories
