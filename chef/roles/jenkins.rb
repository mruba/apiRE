name 'jenkins'
description 'Jenkins server bootstrap'
run_list 'recipe[apt::default]', 
         'recipe[sanpablo::jenkins]'
