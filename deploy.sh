echo "Swiching to branch master"
git checkout master

echo "Building app...."
bun run build


echo "Deoloying files to server...."
scp -r dist/* root@192.168.4.9:/var/www/192.168.4.3/

echo "Done!"
