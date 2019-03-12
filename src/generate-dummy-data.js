import store from '@/store.js'

store.commit('updateProjects', [
  {
    id: '0'
  }
])

export default function init() {

  // Diagram items

// User
  store.commit('addDiagramItem', {
    id: '0',
    componentId: 'yLe24vHtkxBb7TDCKruO',
    position: {
      x: 130,
      y: 400
    }
  })

//cBlocks
  store.commit('addDiagramItem', {
    id: '1',
    componentId: 'vYQPiTu8S6CKrj3CfYFc',
    position: {
      x: 530,
      y: 300
    }
  })

//cBlocks
  store.commit('addDiagramItem', {
    id: '2',
    componentId: 'vYQPiTu8S6CKrj3CfYFc',
    position: {
      x: 530,
      y: 500
    }
  })

// RFID reader
  store.commit('addDiagramItem', {
    id: '3',
    componentId: 'uILOedTPqScpgfIy6uJK',
    position: {
      x: 530,
      y: 200
    }
  })

// RFID card
  store.commit('addDiagramItem', {
    id: '4',
    componentId: 'g4LLTzHTrP85FtTLADNN',
    position: {
      x: 530,
      y: 600
    }
  })

// AR app
  store.commit('addDiagramItem', {
    id: '5',
    componentId: 'Z7zfAapHlt6krJE5SVy6',
    position: {
      x: 330,
      y: 300
    }
  })

// Colored light
  store.commit('addDiagramItem', {
    id: '6',
    componentId: 'Xmeok1noYqbQqcaZxI9x',
    position: {
      x: 730,
      y: 300
    }
  })

// AR marker
  store.commit('addDiagramItem', {
    id: '7',
    componentId: 'PxJ1r6VvoRZJ05aQxHdz',
    position: {
      x: 730,
      y: 600
    }
  })

// Shopping cart
  store.commit('addDiagramItem', {
    id: '8',
    componentId: 'Mhv1AcduTO5ajZbQI6JB',
    position: {
      x: 530,
      y: 400
    }
  })

  // Relationships

  // User to AR app
  store.commit('addDiagramRelationship', {
    id: '0',
    from: '0',
    to: '5',
  })

  // User to shopping cart
  store.commit('addDiagramRelationship', {
    id: '1',
    from: '0',
    to: '8'
  })

  // RFID reader to Colored light
  store.commit('addDiagramRelationship', {
    id: '2',
    from: '3',
    to: '6'
  })

  // Shopping cart to cBlocks
  store.commit('addDiagramRelationship', {
    id: '3',
    from: '8',
    to: '2'
  })

}