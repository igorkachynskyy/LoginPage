import {app} from "../server/Server";
import "supertest";
import supertest from "supertest";
describe("Login test suit", () =>{
    it("Login API Request", async function(){
        const result = await supertest(app).post("/login").send({
            username: "ua777",
            password: "qwery3333"
        });
        expect(result.statusCode).toEqual(200);
    } )
})