const path = require('path')

module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  components: 'src/components/**/[A-Z]*.vue',
  defaultExample: false,
  require: [
    path.join(__dirname, 'styleguide.global.requires.js')
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Titillium+Web'
        }
      ]
    }
  },
  styles: {
    StyleGuide: {
      content: {
        'font-family': 'Titillium Web'
      }
    }
  }
  // },
  // theme: {
  //   fontFamily: {
  //     base: 'Titillium Web'
  //   }
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // }
}
