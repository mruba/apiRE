name "staging-west"
description "Staging us-west-1 environment config"

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
