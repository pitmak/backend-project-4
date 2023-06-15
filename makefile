install:
	npm ci
page-loader:
	node bin/page-loader.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm run test
test-coverage:
	npx jest --coverage
