# Mono repo set-up

## for frontend:
```bash
cd frontend
npm i
npm run dev
```

## for backend

**setting up the database connect**

find your database's by running ```sudo netstat -plnt | grep postgres```


navigate to : ``` src/main/resources/application.properties ```
and change the user and password accordingly 
```
spring.datasource.url=jdbc:postgresql://localhost:5432/cardflip
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```


**to run the application**
```
cd backend/cardflip
./mvnw spring-boot:run
```







