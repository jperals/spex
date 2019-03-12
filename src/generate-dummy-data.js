import store from '@/store.js'

store.commit('updateProjects', [
  {
    id: '0'
  }
])

export default function init() {

  // Relationships

  // User to AR app
  store.commit('addDiagramRelationship', {
    id: '0',
    from: '6l889lHkXWRPmZPPBwAD',
    to: '7jcurmowqshdMVGLMDqa',
  })

  // User to shopping cart
  store.commit('addDiagramRelationship', {
    id: '1',
    from: '6l889lHkXWRPmZPPBwAD',
    to: 'tVvcG3GQn4PVPAjMuLAl'
  })

  // RFID reader to Colored light
  store.commit('addDiagramRelationship', {
    id: '2',
    from: 'AZoiVc1EG0rvRtZBYLRJ',
    to: '6V3NvjM2Qh27uy3gO5wr'
  })

  // Shopping cart to cBlocks
  store.commit('addDiagramRelationship', {
    id: '3',
    from: 'tVvcG3GQn4PVPAjMuLAl',
    to: 'cXpB8a3Sr7BC6cq9N5jy'
  })

}