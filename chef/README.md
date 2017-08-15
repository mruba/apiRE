### provisioning an Amazon EC2 instances

1 .- Setting Environment Variables

export AWS_KEY='your-access-key'
export AWS_SECRET='your-secret-secret'
export AWS_KEYNAME='your-keyname'
export AWS_KEYPATH='your-keypath'
export AWS_DEFAULT_REGION='your-region'


2.- Install the vagrant-aws plugin

$ vagrant plugin install vagrant-aws
$ vagrant plugin install vagrant-omnibus

3.- Fetch AWS Dummy Box

$ vagrant box add dummybox-aws https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box

4.- Startup Vagrant box

$ vagrant up —-provider=aws


# Troubles?
eval "$(chef shell-init zsh)"
