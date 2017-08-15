name 'base'
description 'Base'

run_list  'recipe[chef-solo-search::default]',
          'recipe[apt::default]',
          'recipe[sanpablo::default]',
          'recipe[rvm::user]'

default_attributes(
  rvm: {
    user_installs: [{
      user: 'deploy',
      default_ruby: 'ruby-2.1.0@sanpablo',
      user_default_ruby: 'ruby-2.1.0@sanpablo',
      rubies: ['ruby-2.1.0']
    }]
  }
)
