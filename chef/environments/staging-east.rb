name "staging-east"
description "Staging us-east-1 environment config"

override_attributes(
  sanpablo: {
    aws: true
  },
  mongodb: {
    config: {
      replSet: "sanpablo-staging"
    }
  }
)
