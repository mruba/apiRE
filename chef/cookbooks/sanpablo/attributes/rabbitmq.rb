
#default.rabbitmq.package_name = 'rabbitmq'
default['rabbitmq']['version'] = '3.6.1'
# default['rabbitmq']['use_distro_version'] = true
default['rabbitmq']['erlang_cookie'] = 'zkbqsZYiR9a7kH2hp1DK'

# rabbitmq.config defaults
default['rabbitmq']['default_user'] = 'guest'
default['rabbitmq']['default_pass'] = 'guest'
default['rabbitmq']['rabbitmq_management'] = true
default['rabbitmq']['loopback_users'] = []
default['rabbitmq']['rabbitmq_management_visualiser'] = true

# clustering
default['rabbitmq']['clustering']['enable'] = true
default['rabbitmq']['clustering']['use_auto_clustering'] = false
default['rabbitmq']['clustering']['cluster_partition_handling'] = 'ignore'
# force_default.rabbitmq.max_file_descriptors = 4096
default['rabbitmq']['max_file_descriptors'] = 4096
# force_default['rabbitmq']['max_file_descriptors'] = 4096
# default['rabbitmq']['mnesiadir'] = '/data/lib/rabbitmq/mnesia'
# default['rabbitmq']['clustering']['cluster_nodes'] = [
#     {
#         :name => 'rabbit@ip-10-0-11-235',
#         :type => 'disc'
#     },
#     {
#         :name => 'rabbit@ip-10-0-11-236',
#         :type => 'disc'
#     },
#     {
#         :name => 'rabbit@ip-10-0-11-237',
#         :type => 'disc'
#     }
# ]

# config file location
# default['rabbitmq']['erlang_cookie_path'] = '/data/lib/rabbitmq/.erlang.cookie'
