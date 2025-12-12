import { request } from "../helpers/testServer";
import { clearUsersTable, insertIndicationUser } from "../helpers/setupTestDB";

 
beforeEach(async () => {
  await clearUsersTable();
});

describe("POST /signup", () => {
  it("deve cadastrar um usuário com sucesso", async () => {
    // garante que o código de indicação exista
    insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "Felipe",
      phone: "11999999990",
      password: "senha123",
      confirmPassword: "senha123",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

   it("deve retornar que falta o nome", async () => {
    // garante que o código de indicação exista
    insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "",
      phone: "11999999999",
      password: "senha123",
      confirmPassword: "senha123",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(400);
     
  });
});
