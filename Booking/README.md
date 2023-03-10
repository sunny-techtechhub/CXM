# menuchooser

Git setup
1. create a repo and add user to this repo
2. gen ssh key ssh-keygen -t ed25519 -P "" -f tth -C "sunny@techtechhub.com"
3. ssh-add  ~/.ssh/tth
4. add to ~/.ssh/config
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/tth
5. In github, add tth.pub to User Settings SSH keys
6. In local folder
7. git init
8. git add .
9. git commit -m "..."
10. git branch -M main
11. git remote add origin git@github.com:techtechhub/MenuChooser.git
12. git push -u -f origin main
