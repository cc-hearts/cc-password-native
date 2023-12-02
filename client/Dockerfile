# 使用 Node.js 作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

RUN npm install -g yarn
# 安装 Expo CLI
RUN yarn global add expo-cli

COPY . .

# 安装应用程序依赖
RUN yarn

# 暴露端口
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# 启动应用程序
CMD ["expo", "start", "--tunnel"]