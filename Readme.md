
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


#### ListKelas

```http
  GET /kelas
```



| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**. [Token Refresh] |

*Response Success*
```json
{
    "status": 200,
    "data":[
        {
            "nama_kelas":"...",
            "deskripsi_kelas":"...",
            "mata_pelajaran":"...",
            "nomor_ruangan":"...",
            "created_at":"...",
            "..."
        }
    ]
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

#### ListTugasKelas

```http
  GET /kelas/:idKelas
```


| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**. [Token Refresh] |

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id Kelas` | `Integer` | **Required** |


*Response Success*
```json
{
    "status": 200,
    "data":[
        {
            "...."
        }
    ]
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

#### DetailTugas

```http
  GET /kelas/detail/:idTugas
```


| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**. [Token Refresh] |

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Id Tugas` | `Integer` | **Required** |


*Response Success*
```json
{
    "status": 200,
    "data":[
        {
            "...."
        }
    ]
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

#### Join Kelas

```http
  POST /join
```


| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**. [Token Refresh] |

| Body (JSON) | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `kode_kelas` | `String` | **Required** |


*Response Success*
```json
{
    "status": 200,
    "kelas":"<ID Kelas>"
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

#### Buat Tugas

```http
  POST /tugas
```


| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer` | **Required**. [Token Refresh] |

| Body (Form-Data) | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `judul` | `String` | **Required** |
| `deskripsi` | `String` | **Required** |
| `kode_kelas` | `String` | **Required** |
| `tenggat_waktu` | `String` | **Required**. [null or not null] |
| `lampiran` | `file` | **Option** |


*Response Success*
```json
{
    "status": 200,
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