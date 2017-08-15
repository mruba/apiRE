name 'db'
description 'message broker instances run rabbitmq'

run_list 'recipe[rabbitmq::default]', 'recipe[sanpablo::rabbitmq]'
