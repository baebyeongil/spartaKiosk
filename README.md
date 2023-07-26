# spartaKiosk

All api defaultValue : ("localhost:3000/api")

item Create : post("/item")

item All view : get("/item")

item Type view : get("/item") , body("COFFEE" or "JUICE" or "FOOD")

item Delete : delete("/item/:id") => amount > 0 : delete / amount < 0 : choice ("T" or "F")

  item Answer delete : delete("/item/:id/anwser") , body("T" or "F")
  answer T : Deleted
  answer F : Undelete

item Edit : put("/item/:id") , body("name" or "price")
