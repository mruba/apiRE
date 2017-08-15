name 'db'
description 'DB instances run mongo'

run_list 'recipe[mongodb::10gen_repo]', 'recipe[sanpablo::db]'
