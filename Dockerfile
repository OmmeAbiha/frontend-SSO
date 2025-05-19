FROM node:22.13.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_ENV_NAME
ENV APP_ENV=${NEXT_PUBLIC_ENV_NAME}

RUN if [ "$APP_ENV" = "prod" ]; then \
      echo "NEXT_PUBLIC_ENV_STATE='prod'" > .env; \
    elif [ "$APP_ENV" = "stage" ]; then \
      echo "NEXT_PUBLIC_ENV_STATE='stage'" > .env; \
    else \
      echo "NEXT_PUBLIC_ENV_STATE='dev'" > .env; \
    fi

RUN npm run build

CMD [ "npm", "start" ]