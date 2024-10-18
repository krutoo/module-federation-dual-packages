# Module Federation Dual Packages issue

Example of warning about versions of dual (ESM+CJS) packages

## Run

1. In terminal:

```bash
# in first terminal
cd app-child && npm i && npm run build && npm run serve

# in second terminal
cd app-parent && npm i && npm run dev
```

2. In browser open http://localhost:8500

3. See the warning about Sentry version detection fail
