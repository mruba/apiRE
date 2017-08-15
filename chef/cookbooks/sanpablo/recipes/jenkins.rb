include_recipe 'jenkins::master'

package "nginx"

template "/etc/nginx/conf.d/jenkins-nginx.conf" do
  mode "0600"
  backup false
end
