ssh-add  ~/.ssh/tth
git config --replace-all user.name sunny-techtechhub
git config --replace-all user.email sunny@techtechhub.com
git config --replace-all credential.helper osxkeychain
git config pull.rebase false

export NODE_OPTIONS=--openssl-legacy-provider
