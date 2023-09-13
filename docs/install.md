
### Create a new user
`sudo adduser --group --system --shell /bin/false --home /srv/blob blob`


### Requirements (Debian-based environment)

`node.js >= 16`
`redis`


### Download blob and extract
`wget https://zecche.org/docs/releases/blob.tgz`


### Install nvm

### Install dependencies
`npm install`

### Setup your environment
`cp .env.example .env`

edit your .env

### Run db migration (each upgrade)
`./index.mjs migrate`

### 

### 

### Manually start web UI
`./index.mjs start`

### Manually start worker
`./index.mjs worker`



<!-- #### Download  source from git repository -->
<!-- ### `git clone https://github.com/lesion/blob.git` -->


create systemd files + workers
```
## /etc/systemd/system/blob.service
[Unit]
Description=Blob Service - blob.vulgo.xyz
Documentation=https://doc.cisti.org/blZjmjWHSeGha9Y8NVQV4Q?both
After=network.target

[Service]
Type=simple
User=blob
Restart=on-failure
WorkingDirectory=/home/blob/blob

ExecStart=yarn start

[Install]
WantedBy=multi-user.target
```

```/etc/systemd/system/blob-worker.service
[Unit]
Description=Blob Worker - blob.vulgo.xyz
Documentation=https://doc.cisti.org/blZjmjWHSeGha9Y8NVQV4Q?both
After=network.target

[Service]
Type=simple
User=blob
Restart=on-failure
WorkingDirectory=/home/blob/blob

ExecStart=/home/blob/blob/worker/blob.mjs

[Install]
WantedBy=multi-user.target
```

##### Enable `blob` at boot
```
systemctl enable blob
systemctl enable blob-worker
```

#### 


#### Build
`yarn build`





##### PRODUCTION

How it works?

Vue

app.vue

NuxtJs

section are splitted in components (navbar, etc.)

embed.vue is the Embed part (component)

embed.title > localisation > call locales/en.json 

vuetifyjs

## DEPLOY PROCEDURE ONLY FOR DEV

*N.B.: in the dev environment, you have to pull and install dependencies, because pulling is from sources with no build yet. in production, the pulling will be from already built repo.*

- login on Lennon as "blob" and change location to "/home/blob/blob" - or wherewere blob is installed

```
l200@Lennon:~$ sudo su blob
[sudo] password for l200: 
blob@Lennon:/home/l200$ cd 
blob@Lennon:~$ cd blob/
blob@Lennon:~/blob$ 
``` 

- pull the public repo modifications with git

```blob@Lennon:~/blob$ git pull```

- if an error occurs, stash modifications, then retry git pull

```
blob@Lennon:~/blob$ git pull
Updating 9a09bce..b2d4f65
error: Your local changes to the following files would be overwritten by merge:
	.env
	prisma/dev.db
	yarn.lock
Please commit your changes or stash them before you merge.
Aborting
```

stashing example:

```
blob@Lennon:~/blob$ git stash
Saved working directory and index state WIP on master: 9a09bce minor
```

- verify local variables of the project into ".env" file.

```blob@Lennon:~/blob$ less .env```

- it should look like the following. If not correct, copy-paste the correct path from .env.locale - "file:/home/blob/blob/dev.db?socket_timeout=10&connection_limit=1"

```# env
DATABASE_URL="file:/home/blob/blob/dev.db?socket_timeout=10&connection_limit=1"
BASE_URL=http://localhost:3000
NODE_ENV=production

CHECK_SOURCE_EACH_MINUTE=5
MAX_CONCURRENT_FETCH_PER_SECOND=1

JWT_ACCESS_TOKEN_SECRET='mysecret'
JWT_REFRESH_TOKEN_SECRET='my_super_secret_secret'

```



- install dependencies with yarn

```blob@Lennon:~/blob$ yarn```

- sync databases with "prisma", a simple way to declare how databases are done. Let's look at the file to verify it's the correct one with "less" and then sync with "npx"

```
blob@Lennon:~/blob$ less prisma/schema.prisma
blob@Lennon:~/blob$ npx prisma db push
```

- build the project with "yarn build"

```
blob@Lennon:~/blob$ yarn build
```

- restart the service

```blob@Lennon:~$ systemctl restart blob```