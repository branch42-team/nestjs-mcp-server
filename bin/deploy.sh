set -e

cd "$(dirname "$(realpath "$0")")" || exit
cd ..

git reset --hard HEAD
git pull origin main
docker build --tag assignment-server:latest . --no-cache
docker build --tag assignment-worker:latest . --no-cache
pnpm docker:prod:down
pnpm docker:prod:up
docker volume prune -f
docker image prune -f