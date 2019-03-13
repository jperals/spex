export default function init(context) {

  // Relationships

  context.commit('updateProjects', [
    {
      id: '0'
    }
  ])

  // User to AR app
  context.commit('addDiagramRelationship', {
    id: '0',
    from: '6l889lHkXWRPmZPPBwAD',
    to: '7jcurmowqshdMVGLMDqa',
  })

  // User to shopping cart
  context.commit('addDiagramRelationship', {
    id: '1',
    from: '6l889lHkXWRPmZPPBwAD',
    to: 'tVvcG3GQn4PVPAjMuLAl'
  })

  // RFID reader to Colored light
  context.commit('addDiagramRelationship', {
    id: '2',
    from: 'AZoiVc1EG0rvRtZBYLRJ',
    to: '6V3NvjM2Qh27uy3gO5wr'
  })

  // Shopping cart to cBlocks
  context.commit('addDiagramRelationship', {
    id: '3',
    from: 'tVvcG3GQn4PVPAjMuLAl',
    to: 'cXpB8a3Sr7BC6cq9N5jy'
  })

}