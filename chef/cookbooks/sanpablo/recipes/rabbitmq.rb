#
# Cookbook Name:: sanpablo
# Recipe:: rabbitmq
#
#
require 'json'

include_recipe 'rabbitmq::default'

rabbitmq_vhost "hybris" do
  action :add
end

rabbitmq_user "hybris" do
  password "NGhX35mn5tcLSl"
  action :add
end

rabbitmq_user "mrubalcava" do
  password "NGhX35mn5tcLSl"
  action :add
end

rabbitmq_user "hybris" do
  vhost "hybris"
  permissions ".* .* .*"
  action :set_permissions
end

rabbitmq_user "mrubalcava" do
  tag "administrator"
  action :set_tags
end

# cluster_nodes = node['rabbitmq']['clustering']['cluster_nodes']
# cluster_nodes = cluster_nodes.to_json

# Manual clustering
# unless node['rabbitmq']['clustering']['use_auto_clustering']
#   # Join in cluster
#   rabbitmq_cluster cluster_nodes do
#     cluster_name node['rabbitmq']['clustering']['cluster_name']
#     action :join
#   end
# end

# Set cluster name : It will be skipped once same cluster name has been set in the cluster.
# rabbitmq_cluster cluster_nodes do
#   cluster_name node['rabbitmq']['clustering']['cluster_name']
#   action :set_cluster_name
# end
# Change the cluster node type
# rabbitmq_cluster cluster_nodes do
#   action :change_cluster_node_type
# end
