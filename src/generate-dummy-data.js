import store from '@/store.js'

store.commit('updateProjects', [
  {
    id: '0'
  }
])

export default function init() {

  store.commit('addDiagramRelationship', {
    id: '0',
    from: 'F4lSsfNGpLZlgOnZJcor',
    to: 'g4LLTzHTrP85FtTLADNN',
  })

// User
  store.commit('addDiagramItem', {
    componentId: 'yLe24vHtkxBb7TDCKruO',
    position: {
      x: 30,
      y: 400
    }
  })

//cBlocks
  store.commit('addDiagramItem', {
    componentId: 'vYQPiTu8S6CKrj3CfYFc',
    position: {
      x: 430,
      y: 300
    }
  })

//cBlocks
  store.commit('addDiagramItem', {
    componentId: 'vYQPiTu8S6CKrj3CfYFc',
    position: {
      x: 430,
      y: 500
    }
  })

// RFID reader
  store.commit('addDiagramItem', {
    componentId: 'uILOedTPqScpgfIy6uJK',
    position: {
      x: 430,
      y: 200
    }
  })

// RFID card
  store.commit('addDiagramItem', {
    componentId: 'g4LLTzHTrP85FtTLADNN',
    position: {
      x: 430,
      y: 600
    }
  })

// AR app
  store.commit('addDiagramItem', {
    componentId: 'Z7zfAapHlt6krJE5SVy6',
    position: {
      x: 230,
      y: 300
    }
  })

// Colored light
  store.commit('addDiagramItem', {
    componentId: 'Xmeok1noYqbQqcaZxI9x',
    position: {
      x: 630,
      y: 300
    }
  })

// AR marker
  store.commit('addDiagramItem', {
    componentId: 'PxJ1r6VvoRZJ05aQxHdz',
    position: {
      x: 630,
      y: 600
    }
  })

// AR marker
  store.commit('addDiagramItem', {
    componentId: 'Mhv1AcduTO5ajZbQI6JB',
    position: {
      x: 430,
      y: 400
    }
  })

}