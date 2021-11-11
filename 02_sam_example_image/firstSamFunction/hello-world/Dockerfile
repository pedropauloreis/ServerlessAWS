FROM public.ecr.aws/lambda/nodejs:14

COPY package.json ./

RUN npm install

COPY app.js ./

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambdaHandler"]
