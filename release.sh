# clean past artifacts
# mkdir package
rm -fr .output
rm package/*.tgz

# build web UI
yarn build # put this in package/.output

rm -fr package/lib
cp -ra server/lib package/

rm -fr package/cli.js
cp -ra server/cli.js package/

rm -fr package/worker
cp -ra server/worker package/

rm -fr package/prisma
cp -ra prisma/ package/

tar --create --gzip --dereference --file package/nuxt.tgz .output

cd package
npm version patch
npm pack




# copio il worker, le lib, e la cli nella build
# cp -ra server/lib server/worker server/cli prisma .output/server

# cp .env .output/

# sed -i '/"name".*/s//"name": "blob-feed",\n  "type": "module",/' .output/server/package.json

# devo modificare il type module del package dell'output server
# tar cvzf 

# sade
# bcrypt
