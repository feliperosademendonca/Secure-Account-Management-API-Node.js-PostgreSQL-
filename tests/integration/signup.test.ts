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
      name: "teste1",
      phone: "32987542154",
      password: "123456",
      confirmPassword: "123456",
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

    expect(response.body).toHaveProperty("message");

  });

  it("deve retornar erro de telefone invalido ou ausente", async () => {
    // garante que o código de indicação exista
    insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "teste1",
      phone: "",
      password: "senha123",
      confirmPassword: "senha123",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

  });

  it("deve retornar erro Senhas não corresponden", async () => {
    // garante que o código de indicação exista
    insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "teste1",
      phone: "",
      password: "123senha",
      confirmPassword: "senha123",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

  });

  it("deve retornar erro Id Inválido ou Ausente", async () => {
    // garante que o código de indicação exista
    insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "teste1",
      phone: "",
      password: "123senha",
      confirmPassword: "senha123",
      indicationId: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

  });
});


describe("POST /login", () => {

  const user = {
    name: "teste10",
    phone: "32987542154",
    password: "123456",
    confirmPassword: "123456",
    indicationId: "ABC123",
  };

  beforeAll(async () => {
    await clearUsersTable();           // garante estado limpo
    insertIndicationUser("ABC123");    // garante dependência
    await request.post("/signup").send(user);
  });

  it("deve retornar sucesso no login", async () => {
    const response = await request.post("/login").send({
      phone: user.phone,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("deve retornar erro de login", async () => {
    const response = await request.post("/login").send({
      phone: "",
      password: "123456A@",
    });

    expect(response.status).toBe(400);
  });

});


