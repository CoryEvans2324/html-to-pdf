# html-to-pdf

```bash
docker pull ghcr.io/coryevans2324/html-to-pdf
```

### Build the service
```bash
docker build -t ghcr.io/coryevans2324/html-to-pdf .
```

### Run the service
```bash
docker run --rm -d \
	--name htmltopdf \
	-p 3000:3000 \
	-e JAVASCRIPT_ENABLED=false \
	ghcr.io/coryevans2324/html-to-pdf
```

Environment Variables
| Name | Description |
|--:|:--|
|PORT| Port the express server listens on.<br>Default: `3000` |
|JAVASCRIPT_ENABLED| Whether javascript is enabled in the headless browser page.<br>Default: `false`<br>Set to `true` to enable JS. |

Make a request to the service:
```bash
wget -O doc.pdf http://localhost:3000/?url=https://google.com
```