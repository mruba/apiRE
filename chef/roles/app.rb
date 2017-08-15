name 'app'
description 'app'

run_list 'recipe[sanpablo::app]' , 'recipe[nodejs::nodejs_from_binary]', 'recipe[nodejs::npm]', 'recipe[pm2::default]'
