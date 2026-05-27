group "default" {
  targets = ["pix-site", "pix-pro"]
}

variable DOMAIN_FR {
  default = "http://localhost:8080"
  validation {
    condition = DOMAIN_FR == regex("^https?://.*", DOMAIN_FR)
    error_message = "DOMAIN_FR must be an URL and start by http:// or https://"
  }
}

variable DOMAIN_ORG {
  default = "http://localhost:8081"
  validation {
    condition = DOMAIN_ORG == regex("^https?://.*", DOMAIN_ORG)
    error_message = "DOMAIN_ORG must be an URL and start by http:// or https://"
  }
}

variable EASIWARE_SCRIPT_URL {
   default = null
}

variable REGISTRY {
   default = null
}

variable TAG {
  default = "dev"
}

function "repository" {
  params = [site]
  result = REGISTRY != null ? "${REGISTRY}/${site}" : "${site}"
}

target "pix-site" {
  context = "."
  dockerfile = "Dockerfile"
  args = {
    SITE = "pix-site"
    DOMAIN_FR = "${DOMAIN_FR}"
    DOMAIN_ORG = "${DOMAIN_ORG}"
  }
  tags = TAG != "dev" ? [ "${repository("pix-site")}:latest", "${repository("pix-site")}:${TAG}" ] : [ "${repository("pix-site")}:dev" ]
}

target "pix-pro" {
  context = "."
  dockerfile = "Dockerfile"
  args = {
    SITE = "pix-pro"
    DOMAIN_FR = "${DOMAIN_FR}"
    DOMAIN_ORG = "${DOMAIN_ORG}"
  }
  tags = TAG != "dev" ? [ "${repository("pix-pro")}:latest", "${repository("pix-pro")}:${TAG}" ] : [ "${repository("pix-pro")}:dev" ]
}
