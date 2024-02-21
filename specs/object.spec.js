//import package yang dibutuhkan
const request = require("supertest"); //import supertest
const { expect } = require("chai"); //import chai

//Test POST, GET, PUT, DELETE
describe("object", function() {
    let id;

    //test list of all object
    it("should list of all object", async function() {
        const response = await request("https://api.restful-api.dev").get("/objects");
        //Assertions
        expect(response.status).equal(200);
    })

    //test add object
    it("should add object", async function() {
        const response = await request("https://api.restful-api.dev").post("/objects").send({
            name: "Apple MacBook Pro 16",
            data: {
                year: 2019,
                price: 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        });

        id = response.body.id;

        //Assertions
        expect(response.status).equal(200);
        expect(response.body.name).to.equal("Apple MacBook Pro 16");
        expect(response.body.data.year).to.equal(2019);
        expect(response.body.data.price).to.equal(1849.99);
    })

    //test get single object
    it("should get single object", async function() {
        const response = await request("https://api.restful-api.dev").get("/objects/" + id);
        //Assertions
        expect(response.status).equal(200);
        expect(response.body.id).to.equal(id);
    })

    //test update object
    it("should update object", async function() {
        const response = await request("https://api.restful-api.dev").put("/objects/" + id).send({
            name: "Apple MacBook Pro 16",
            data: {
                year: 2020,
                price: 1923.23,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        });

        //Assertions
        expect(response.status).equal(200);
        expect(response.body.name).to.equal("Apple MacBook Pro 16");
        expect(response.body.data.year).to.equal(2020);
        expect(response.body.data.price).to.equal(1923.23);
    })

    //test delete object
    it("should delete object", async function() {
        const response = await request("https://api.restful-api.dev").delete("/objects/" + id);
        //Assertions
        expect(response.status).equal(200);
        expect(response.body.message).to.equal(`Object with id = ${id} has been deleted.`);
    })
})


