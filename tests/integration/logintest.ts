import { request } from "../helpers/testServer";
import { clearUsersTable, insertIndicationUser } from "../helpers/setupTestDB";

describe("POST /signup", () => {

  beforeEach(async () => {
    await clearUsersTable();
  });

  it("deve cadastrar um usuário com sucesso", async () => {
    await insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "teste1",
      phone: "32987542154",
      password: "123456",
      confirmPassword: "123456",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(201);
  });

  it("deve retornar erro quando nome estiver ausente", async () => {
    await insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "",
      phone: "11999999999",
      password: "senha123",
      confirmPassword: "senha123",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar erro quando telefone estiver ausente", async () => {
    await insertIndicationUser("ABC123");

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

  it("deve retornar erro quando senhas não correspondem", async () => {
    await insertIndicationUser("ABC123");

    const response = await request.post("/signup").send({
      name: "teste1",
      phone: "11999999999",
      password: "123senha",
      confirmPassword: "senha123",
      indicationId: "ABC123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("deve retornar erro quando código de indicação for inválido", async () => {
    const response = await request.post("/signup").send({
      name: "teste1",
      phone: "11999999999",
      password: "123senha",
      confirmPassword: "123senha",
      indicationId: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});
