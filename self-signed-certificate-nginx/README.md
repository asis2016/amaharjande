# Self-signed certificate setup on nginx

This article shows you how you can create a self-signed certificate for nginx.

## Tech stack
- Operating System: CentOS Stem 8
- Web Server: nginx

## nginx installation
First of all, install nginx on your machine, update repository file for the YUM package manager:
```bash
$ sudo vi /etc/yum.repos.d/nginx.repo

#For CentOS:
[nginx]
name=nginx repo
baseurl=https://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

Install, enable and start the nginx:
```bash
$ sudo dnf -y install nginx
$ sudo systemctl enable nginx
$ sudo systemctl start nginx
```

Add `http` in the firewall rule:
```bash
$ sudo firewall-cmd --permanent --add-service=http
$ sudo firewall-cmd --reload
```

## index.html file
Edit your `index.html` file:

```bash
$ sudo vi /usr/share/nginx/html/index.html
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```

Test the nginx configuration and restart if everything is OK:
```bash
$ sudo nginx -t
$ sudo systemctl restart nginx
$ systemctl status nginx
```

## Edit nginx.conf
Note: nginx.conf is the main configuration file for your nginx web server.

check `nginx.conf`:
```bash
...
    ssl_certificate "/etc/pki/nginx/server.crt";
    ssl_certificate_key "/etc/pki/nginx/server.key";
...
```

## Self-signed certificate
First of all create a directory called `pki` (can be anything):
```bash
$ sudo mkdir -p ~/pki
$ cd ~/pki
```

Secondly, by using the following command; it generates the private key through RSA algorigthm with output file called `server.key`:
```bash
$ openssl genpkey -algorithm RSA -out server.key
```

Thirdly create a `server.crt` (self-signed certificate) by the following command:
```bash
$ openssl req -new -key server.key -x509 -days 365 -out server.crt
```
- x509: Instructs OpenSSL to output a self-signed certificate instead of a certificate request.
- days 365: Validity period is 365 days

Now, copy `server.crt` and `server.key` to `/etc/pki/nginx/`: 
```bash
$ sudo mkdir -p /etc/pki/nginx
$ sudo cp server.crt  /etc/pki/nginx/
$ sudo cp server.key  /etc/pki/nginx/
```

Moreover, restart the webserver:
```bash
$ sudo nginx -t
$ sudo systemctl restart nginx
```

Finally, whitelist `https` on firewall
```bash
$ sudo firewall-cmd --permanent  --add-service=https
$ sudo firewall-cmd --reload
$ sudo firewall-cmd --list-all
```

## References
- [https://www.nginx.com/resources/wiki/start/topics/tutorials/install/](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
