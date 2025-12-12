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
  it("deve retornar sucesso no login", async () => {
 

    const response = await request.post("/login").send({
  
      phone: "11999999990",
      password: "senha123",
      
    });
    console.log('response login:',response.body)
     
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

   it("deve retornar erro de login ", async () => {
 

    const response = await request.post("/login").send({
  
      phone: "",
      password: "123456A@",
      
    });

     
    expect(response.status).toBe(400);
   });


 
});

