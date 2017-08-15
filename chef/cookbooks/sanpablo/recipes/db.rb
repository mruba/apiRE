#
# Cookbook Name:: sanpablo
# Recipe:: db
#
#
directory node.mongodb.config.dbpath do
  owner "mongodb"
  group "mongodb"
  mode "0755"
  recursive true
end

directory node.mongodb.logdir do
  owner "mongodb"
  group "mongodb"
  mode "0755"
  recursive true
end

template "/etc/mongodb.conf" do
  mode "0644"
end

include_recipe "mongodb::replicaset"
