
## API Reference

#### Register Accounts

```http
  POST /register
```

| Body (JSON) | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `usernme` | `string` | **Required**.  |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

### 

*Response Success*
```json
{
    "status": 200,
    "message": "Successfuly Registerd"
}
```
*Response Failed*
```json

{
    "status": 400,
    "message": "Email Already Registered"
}

<!-- OR -->

{
    "status": 400,
    "message": "Data Is Not Defined"
}

<!-- And Something Else .. -->
```


#### Login Accounts

```http
  POST /login
```

| Body (JSON) | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `usernme OR Email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

### 

*Response Success*
```json
{
    "status": 200,
    "users": {
        "id_users": 818236,
        "username": "example",
        "email": "example@example.com",
        "password": "$2b$10$Eu7lyXMsr.rTNQpiCNR7r.6sO2/2smrvlniUSkr26b/CYxtj/hft6",
        "token": "token ...",
        "refresh_token":"token refresh ..",
        "profile": null
    }
}
```
*Response Failed*
```json

{
    "status": 400,
    "message": "Email OR Username doesn't Exists"
}

<!-- OR -->

{
    "status": 400,
    "message": "Email Or Password Wrong"
}

<!-- And Something Else .. -->
```

#### Buat Kelas Accounts

```http
  POST /kelas
```

| Body (JSON) | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nama_kelas` | `string` | **Required**.  |
| `mata_pelajaran` | `string` | **Required**.  |

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**.  |

*Response Success*
```json
{
    "status": 200,
    "kelas":"SH27A"
}
```
*Response Failed*
```json

{
    "status": 501,
    "message": "Failed Create Kelas"
}


<!-- And Something Else .. -->
```

#### Refresh Token Accounts

```http
  GET /refresh
```



| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**. [Token Refresh] |

*Response Success*
```json
{
    "status": 200,
    "token":"your token"
}
```
*Response Failed*
```json

{
    "status": 401,
    "message": "Wrong Credentials"
}


<!-- And Something Else .. -->
```