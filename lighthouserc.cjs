module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: [
        "/modernCSS/home/index.html",
        "/modernCSS/about_depresso/index.html",
        "/modernCSS/I_hate_your_website/index.html",
        "/modernCSS/Projects/projects/index.html",
        "/modernCSS/Projects/coding_projects/index.html",
        "/modernCSS/Projects/physical_projects/index.html",
        "/modernCSS/Projects/physics_simulations/index.html",
        "/modernCSS/Projects/robotics_projects/index.html",
        "/modernCSS/Projects/coding_blog/american_units/index.html",
        "/modernCSS/Games/celeste_moments/index.html",
        "/modernCSS/Games/touhou_moments/index.html",
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