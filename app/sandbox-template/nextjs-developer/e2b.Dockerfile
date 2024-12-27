# You can use most Debian-based base images
FROM node:21-slim

RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh

RUN chmod +x /compile_page.sh

WORKDIR /home/user/nextjs-app 
RUN npx create-next-app@latest . --ts --tailwind --no-eslint --src-dir app --app-dir app --use-npm

COPY _app.tsx src/app/_app.tsx

RUN npx shadcn@latest init -d
RUN npx shadcn@latest add --all
RUN npm install posthog-js

# Move the Nextjs app to the home directory and remove the nextjs-app directory
RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app

# Install dependencies and customize sandbox
