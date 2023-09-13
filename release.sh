# clean past artifacts
npx nuxi cleanup

# docs
npm run docs:build
cp -ra docs/.vitepress/dist public/docs

# build web UI
npx nuxi cleanup
npx nuxi build
rm -fr package/webUI
cp -ra .output/ package/webUI/

# copy blob utilities
rm -fr package/lib
cp -ra server/lib package/

# cli
cp -ra server/cli.mjs package/blob.mjs

# worker
rm -fr package/worker
cp -ra server/worker package/

# prisma
rm -fr package/prisma
mkdir package/prisma
cp  prisma/schema.prisma package/prisma/
cp -ra prisma/migrations package/prisma/migrations

rm -fr package/node_modules
tar cvzf blob.tgz package
# npm install @prisma/client
# npx prisma generate


# npm version
# npm pack




# copio il worker, le lib, e la cli nella build
# cp -ra server/lib server/worker server/cli prisma .output/server

# cp .env .output/

# sed -i '/"name".*/s//"name": "blob-feed",\n  "type": "module",/' .output/server/package.json

# devo modificare il type module del package dell'output server
# tar cvzf 

# sade
# bcrypt