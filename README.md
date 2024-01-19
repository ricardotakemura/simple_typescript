# Preparamento o ambiente

## Ferramentas
 - Kreya: `sudo snap install kreya`
 - DBGate: `sudo snap install dbgate`
 - MongoDB: `docker-compose up`

## Install
```shell
npm install
npm run build
```

# Rodando a aplicação

## Iniciando a aplicação
```shell
npm run start
```

## Configuração da aplicação
Arquivo: `config.ts`:
```typescript
export const Config = {
    CSV_SEPARATOR: ";",
    GRPC_IP_PORT: "0.0.0.0:50051",
    LOGGER_ENABLED: true,
    MONGODB_URL: "mongodb://127.0.0.1:27017",
    MONGODB_DATABASE: "simple",
    REST_PORT: 3030,
    USER_MONGODB_COLLECTION: "users",
    USER_CSV_FILE: "data/users.csv",
    USER_GRPC_PROTO_PATH: "protos/route.user.proto",
    USER_MODEL: 'mongodb', //pode ser "csv"
    USER_VIEW: 'rest', //pode ser "grpc"
}
```

## Acessando a aplicação
- REST: `http://127.0.0.1:3030`
  - Lista todos os usuários: `GET /user`
  - Lista um usuário pelo *id*: `GET /user/{id}`
  - Remove o usuário pelo *id*: `DELETE /user/{id}`
  - Cria um usuário: `POST /user` - Corpo:
    ```json
    {
        "id": "novo_id",
        "name": "novo_nome"
    }
    ```
- GRPC: `http://127.0.0.1:50051`
  - Lista todos os usuários: `RouteUser.GetUsers`
  - Lista um usuário pelo *id*: `RouteUser.GetUser({id: "id"})`
  - Remove o usuário pelo *id*: `RouteUser.RemoveUser({id: "id"})`
  - Cria um usuário: `RouteUser.RegisterUser({id: "novo_id", name: "nome_nome"})`
