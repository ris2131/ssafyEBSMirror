docker build -t frontimg ./front-end
docker ps -f name=frontimg -q \
                                        | xargs --no-run-if-empty docker container stop
docker container ls -a -f name=frontimg -q \
                                        | xargs -r docker container rm
docker run -d --name frontimg -p 3000:3000 frontimg
