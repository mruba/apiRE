#
# Cookbook Name:: sanpablo
# Recipe:: app
#
#
include_recipe 'git'

package "nginx"


# global "express"
# nodejs_npm 'express'

# nodejs_npm 'pm2' do
#   url 'github Unitech/pm2'
# end


# template "/etc/nginx/conf.d/app-nginx.conf" do
#   mode "0600"
#   backup false
# end
