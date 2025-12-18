// tests/helpers/testServer.ts
import supertest from "supertest";
import { app } from "../../src/app";

export const request = supertest(app);
export const agent = supertest.agent(app);