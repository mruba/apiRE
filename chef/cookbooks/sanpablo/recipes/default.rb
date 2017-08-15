#
# Cookbook Name:: sanpablo
# Recipe:: default
#
#

package "vim"
package "htop"
package "git"
# package "openjdk-7-jre-headless"
# package "imagemagick"

user "deploy"
home_dir = node.deploy.home_dir

user "deploy" do
  comment "deploy user"
  home home_dir
  shell "/bin/bash"
  # Trying pw didn't work, but that's fine b/c we want to lock anyways
  supports manage_home: true # needed to actually create home dir

  action [:create, :lock]
end

[ home_dir ].each do |d|
  directory d do
    owner 'deploy'
    group 'deploy'
    mode '755'
    recursive true
  end
end

sudo 'deploy' do
  user "deploy"
  commands %w(NOPASSWD:ALL)
end

# include_recipe 'nvm'

# version = 'v0.10.5'
# node.set['nvm']['nvm_install_test']['version'] = version

# nvm_install version  do
# 	from_source false
# 	alias_as_default true
# 	action :create
# end

# %w(yo grunt-cli bower).each do |p|
#   execute "npm install #{p}" do
#     command "/usr/local/src/nvm/v0.10.5/bin/node /usr/local/src/nvm/v0.10.5/bin/npm install -g #{p}"
#     not_if "/usr/local/src/nvm/v0.10.5/bin/node /usr/local/src/nvm/v0.10.5/bin/npm list -g #{p} | grep #{p}"
#   end
# end

data_mount_point = "/data"
data_device = "/dev/xvdf"


directory data_mount_point do
  mode '0755'
end

execute 'mkfs' do
  command "mkfs -t ext4 #{data_device}"
  # only if it's not mounted already
  not_if "grep -qs #{data_mount_point} /proc/mounts || grep -qs #{data_mount_point} /etc/fstab"
  not_if { !FileTest.exists?(data_device) }
end

mount data_mount_point do
  device data_device
  fstype "ext4"
  action [:mount, :enable]
  not_if { !FileTest.exists?(data_device) }
end

directory "#{data_mount_point}/app"

link "#{home_dir}/app" do
  to "#{data_mount_point}/app"
end

directory "#{home_dir}/.ssh" do
  owner "deploy"
  group "deploy"
  mode "0700"
end

template "#{home_dir}/.ssh/authorized_keys" do
  source "authorized_keys.erb"
  owner "deploy"
  group "deploy"
  mode "0600"
  users = []
  data_bag("users").each do |username|
    users.push(data_bag_item("users", username))
  end
  variables :users => users
end

[ home_dir, "#{home_dir}/app/sanpablo" ].each do |d|
  directory d do
    owner 'deploy'
    group 'deploy'
    mode '755'
    recursive true
  end
end
