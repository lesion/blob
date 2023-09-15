### Starting with blob
To properly install **Blob** on Linux, we need **NodeJS (>=16 <=18)** , **Redis** and pm2 to be installed on our system.

To install redis:
```bash
sudo apt install redis-server
```

NodeJS installation is a bit longer in some cases but if you have clean and recent machine you can install using:

```bash
sudo apt install nodejs
```

In case your linux distribution does not include nodejs or includes an incompatible version I suggest you to [enable nodesource repositories](https://github.com/nodesource/distributions#installation-instructions):
```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y
```

Now by starting `node --version` you must have one version compatible with **Blob** (>=16 and <=18).

### Install pm2
PM2 is a process manager for Node.js applications, it is going to keep **Blob** up by restarting the application if it crashes.
These crashes should NOT happen, but it is good know that PM2 has your back. 
PM2 it is going to help you by restarting your node application as a service every time you restart the server.

```bash
sudo npm install pm2 -g --unsafe-perm
```

### Create a new blob user
Like any service running on a production server, PM2 should run under its own user context.
By doing so we eliminate a large security hole and minimize the amount of damage an attacker can do via a vulnerability.

When services running as root become compromised, an attacker will have full access to the server. They obtain root level privileges that permit them to do anything.

On the other hand, by running your service with an unprivileged user account, we significantly decrease our security footprint and the amount of damage that can be done.

The following command creates a service account named blob.

```bash
sudo adduser --group --system --shell /bin/false --home /srv/blob blob
```


```bash
sudo pm2 startup systemd -u blob --hp /srv/blob
```


### Download blob and extract

```bash
wget https://zecche.org/docs/releases/blob.tgz
sudo tar xvzf blob.tgz -C /srv/blob
sudo chown blob.blob -R /srv/blob
```


### Install dependencies
```bash
npm install
```

### Setup your environment
```bash
cp .env.example .env
```

Edit your .env to modify your base url and your secret tokens at least.

### Start web UI
```bash
sudo pm2 start blob.mjs --name blob-webUI --user blob -- start
```

### Start worker
```bash
sudo pm2 start blob.mjs --name blob-worker --user blob -- worker
```

### Create an admin
```bash
./blob.mjs create user admin password
```

### Setup NGINX proxy

```nginx
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:4000; # set the address of the Node.js instance here
    }
}
```

```bash
sudo nginx -t
sudo nginx -s reload
```

### Install and enable certbot

```bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d your-domain.com
```


### View logs
With pm2 installed it is really easy to watch logs

```bash
sudo pm2 logs
```



### Upgrade

```bash
wget https://zecche.org/docs/releases/blob.tgz
sudo tar xvzf blob.tgz -C /srv/blob
sudo chown blob.blob -R /srv/blob
```