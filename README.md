# pouchdb-server-continuous-feed-debug

Reproducable test case for https://github.com/pouchdb/pouchdb-server/issues/97

### Setup

```
git clone git@github.com:gr2m/pouchdb-server-continuous-feed-debug.git
cd pouchdb-server-continuous-feed-debug
npm install
```

### Reproduce bug

Start the PouchDB server in one tab

```
npm run server
```

Then start the debug script

```
npm start
```

### To manually reproduce bug

1. Install pouchdb-server: `npm install -g pouchdb-server`
2. Start pouchdb-server: `pouchdb-server -p 5985 --in-memory`
3. open http://localhost:5985/_utils
4. Create database "test"
5. Fix admin party, create admin user, username / password don't matter
6. Sign out
7. Open http://localhost:5985/test/_changes?since=0&feed=continuous&heartbeat=30000
8. Boom, you should see

```
TypeError: Object [object Promise] has no method 'on'
   at changes (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express-pouchdb/lib/routes/changes.js:43:35)
   at Layer.handle [as handle_request] (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/layer.js:82:5)
   at next (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/route.js:100:13)
   at Route.dispatch (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/route.js:81:3)
   at Layer.handle [as handle_request] (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/layer.js:82:5)
   at /pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:235:24
   at param (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:332:14)
   at param (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:348:14)
   at Function.proto.process_params (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:392:3)
   at /pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:229:12
   at Function.match_layer (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:296:3)
   at next (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:190:10)
   at /pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:192:16
   at Function.match_layer (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:296:3)
   at next (/pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:190:10)
   at /pouchdb-server-continuous-feed-debug/node_modules/pouchdb-server/node_modules/express/lib/router/index.js:192:16
```
