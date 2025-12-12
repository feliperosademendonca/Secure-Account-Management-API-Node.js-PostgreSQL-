import { request } from "../helpers/testServer";
import { clearUsersTable, insertIndicationUser } from "../helpers/setupTestDB";
import { isNumberObject } from "util/types";

 
beforeEach(async () => {
  await clearUsersTable();
});

 
describe("Teste de teste", () => {
  it("somar 1+1=2 ", async () => {
 

   let number1 : number = 1
   let number2 : number = 1
   let result : number 

    result =  number1 + number2 
    expect(result).toBe(2);
    expect(number1 + number2).toBe(2);
    });

     
  });

   


 