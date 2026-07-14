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
        "/lessCSS/home/index.html",
        "/lessCSS/about_depresso/index.html",
        "/lessCSS/I_hate_your_website/index.html",
        "/lessCSS/Projects/projects/index.html",
        "/lessCSS/Projects/coding_projects/index.html",
        "/lessCSS/Projects/physical_projects/index.html",
        "/lessCSS/Projects/physics_simulations/index.html",
        "/lessCSS/Projects/robotics_projects/index.html",
        "/lessCSS/Projects/coding_blog/american_units/index.html",
        "/lessCSS/Games/celeste_moments/index.html",
        "/lessCSS/Games/touhou_moments/index.html",
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: '.*modernCSS/home\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 0.8 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/about_depresso\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 0.8 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/I_hate_your_website\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 0.8 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/projects\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 0.8 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/coding_projects\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/physical_projects\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/robotics_projects\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/physics_simulations\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/american_units\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/celeste_moments\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
        {
          matchingUrlPattern: '.*modernCSS/touhou_moments\\.html$',
          assertions: {
            'categories:accessibility':['error', { minScore: 1.0 }]
          }
        },
      ]
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};