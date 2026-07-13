module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: [
        "/modernCSS/home/index.html",
        "/modernCSS/Projects/projects/index.html"
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: '.*home\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 0.8 }]
          }
        },
        {
          matchingUrlPattern: '.*projects\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 0.8 }]
          }
        }
      ]
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};