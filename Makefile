prepare: 
	git config core.hooksPath .git-hooks || echo 'Not in a git repo'

dev:
	npm run dev

lint:
	npm run lint

lint-prod:
	npm run lint:prod

lint-staged:
	npm run lint:staged
