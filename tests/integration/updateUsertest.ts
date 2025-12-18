import { request, agent } from "../helpers/testServer";
import {
    clearUsersTable,
    insertIndicationUser,
    insertUser,
} from "../helpers/setupTestDB";

describe("PUT /user (auth via cookie)", () => {

    beforeEach(async () => {
        await clearUsersTable();
        await insertIndicationUser("ABC123");

        await insertUser({
            name: "Usuário Original",
            phone: "11999999999",
            password: "123456",
            indicationId: "ABC123",
        });

        const login = await agent.post("/login").send({
            phone: "11999999999",
            password: "123456",
        });

        expect(login.status).toBe(200);
    });

    it("deve atualizar o nome do usuário autenticado", async () => {
        const response = await agent.put("/user").send({
            name: "Nome Atualizado",
            phone: "11999999999",
            password: "123456",
            passwordConfirm: "123456",

        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });

    it("deve negar acesso sem cookie", async () => {
        const response = await request.put("/user").send({
            name: "Nome Atualizado",
        });

        expect(response.status).toBe(401);
    });
});
