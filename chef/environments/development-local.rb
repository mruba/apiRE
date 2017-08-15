# Rake install isn't installing this environment
# So for now, doing `knife environment from file /path/to/file`
name "development-local"
description "Local environment runs on my laptop"

override_attributes(
  sanpablo: {
    api: {
    }
  },
  monitor: {
    master: {
      hosts: []
    }
  },
  monit: {
    remote_service_check: true,
    email: {
      service_check: "monit-service-checks@mailinator.com",
      host_check: "monit-host-checks@mailinator.com"
    }
  },
  rails: { env: "development" }
)
