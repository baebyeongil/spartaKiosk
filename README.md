# spartaKiosk

# ITEM

All api defaultValue : ("localhost:3000/api")

item Create : post("/item")

item All view : get("/item")

item Type view : get("/item")

item Delete : delete("/item/:id") => (amount > 0) : delete / (amount < 0) : choice ("T" or "F")

- item Answer delete : delete("/item/:id/anwser")
- answer T : Deleted
- answer F : Undelete

item Edit : put("/item/:id") , body("name" or "price")

# OPTION

option Create : post("/option")

option View : get("/option")

option Edit : apu("/option/:id")

option Delete : delete("/option/:id")

# ORDER

order Create : post("/order)

order Edit : post("/order/:orderCustomerId")

# Server Run

npm start

run app.js > start() > fetchOptionData() > expressconnect() >

connectMiddleware() > app.listen()

# Used

.camel case
.express
.sequelize
.sequelize-cli
.node-cache
.mysql2
.nodemon
.babel/cli /core /node /preset-env
.prettier
