FROM node:16

ENV NO_UPDATE_NOTIFIER=true
ENV SFB_TOOLKIT=/app/bin/index.js
ENV HOME=/home/node

WORKDIR /app
RUN adduser node root && \
    chown node:root /app $HOME && \
    chmod g=u /app $HOME
USER node:root

COPY --chown=node:root . ./
RUN npm ci -f --legacy-peer-deps && \
    npm cache clean --force

RUN chmod a+x /app/commands.sh

RUN $SFB_TOOLKIT setup-e2e-theme Plaza

WORKDIR /app/Plaza

RUN $SFB_TOOLKIT use-local-sfb-components

EXPOSE 3555
ENTRYPOINT ["sh", "/app/commands.sh"]
