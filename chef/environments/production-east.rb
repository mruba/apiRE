name "production-west"
description "Production us-west-1 environment config"

override_attributes(
  sanpablo: {
    aws: true
  },
  mongodb: {
    config: {
      replSet: "sanpablo-production"
    }
  }
)
