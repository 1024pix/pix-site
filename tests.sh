#!/bin/bash

GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
RESET=$(tput sgr0)

function checkRedirect() {
  local host=$1
  local path=$2
  local forwardedHost=$3
  local forwardedScheme=$4
  local expectedStatus=$5
  local expectedLocation=$6

  echo -e "\nWhen url = $host$path and X-Forwarded-Host header = $forwardedHost"
  echo -e "   It returns $expectedStatus and location header = $expectedLocation"
  local response=$(curl -w "%{http_code} %{redirect_url}" -k http://localhost$path -H "Host: $host" -H "X-Forwarded-Host: $forwardedHost" -H "X-Forwarded-Proto: $forwardedScheme" -o /dev/null --silent)

  if [ "$response" != "$expectedStatus $expectedLocation" ]; then
    echo "${RED}❌ Expected $expectedStatus $expectedLocation for url $host$path, got $response ${RESET}"
    exit 2
  else
    echo "${GREEN}✅ Success ${RESET}"
  fi
}

checkRedirect pix.fr / "" "" 200
checkRedirect pix.fr /competences "" "" 301 http://pix.fr/competences/
checkRedirect pix.org /_nuxt/LICENSES "" "" 200
checkRedirect pix.org /images/ "" "" 403
checkRedirect pix.fr /aide "" "" 302 https://support.pix.org/
checkRedirect pix.fr /help "" "" 302 https://support.pix.org/
checkRedirect pix.fr /employeurs "" "" 302 https://pro.pix.fr/
checkRedirect pix.org /_assets/ "" "" 404
checkRedirect review.scalingo.io /_assets/ "review.pix.org" "https" 404
checkRedirect pix.org /favicon.ico "" "" 200
checkRedirect pix.org /favicon.ico "review.pix.org" "" 200
