#!/bin/sh
# Decrypt the file
mkdir $GITHUB_WORKSPACE/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
--output $GITHUB_WORKSPACE/secrets/keyfile_dev.json keyfile_dev.json.gpg