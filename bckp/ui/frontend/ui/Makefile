IMAGE := bc-services/hpay-frontend:0.1
CONTAINER := hpay-frontend

DOCKERFILE := Dockerfile



build:
	docker build -t $(IMAGE) -f $(DOCKERFILE) .
run:
	docker run -it --name $(CONTAINER) \
		--hostname=$(CONTAINER) \
		-p 8080:8080 \
		--restart=always \
		$(IMAGE)

logs:
	docker logs -f $(CONTAINER)
shell:
	docker exec -it $(CONTAINER) /bin/bash
start:
	docker start $(CONTAINER)
stop:
	docker stop $(CONTAINER)
	docker rm -f $(CONTAINER)
rerun: stop run
restart:
	docker restart $(CONTAINER)
clean:
	docker rmi $(IMAGE)
