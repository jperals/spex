// Listen and react to realtime changes! 😎

import {db} from '@/store/firebase'
import store from "@/store";

export default function listen() {
  const componentsCollection = db.collection('components')
  const diagramItemsCollection = db.collection('diagram-items')
  const diagramRelationshipsCollection = db.collection('diagram-relationships')
  const framesCollection = db.collection('frames')
  const storiesCollection = db.collection('stories')

  componentsCollection
    .onSnapshot(documents => {
      store.dispatch('loadComponentsFromDatabaseDocuments', documents)
    })

  diagramItemsCollection
    .onSnapshot(documents => {
      store.dispatch('loadDiagramItemsFromDatabaseDocuments', documents)
    })

  diagramRelationshipsCollection
    .onSnapshot(documents => {
      store.dispatch('loadDiagramRelationshipsFromDatabaseDocuments', documents)
    })

  framesCollection
    .onSnapshot(documents => {
      store.dispatch('loadFramesFromDatabaseDocuments', documents)
    })

  storiesCollection
    .onSnapshot(documents => {
      store.dispatch('loadStoriesFromDatabaseDocuments', documents)
    })
}