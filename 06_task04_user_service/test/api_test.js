var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

var testServer = require('../index.js');

describe("user_service", () => {
    it("first interaction with user.. primary.html", (done) =>{
        chai.request(testServer)
            .get('/')
            .end((err, res) => {
                (res).should.have.status(200);
                done();
            });
    });
    describe("register", () => {
        it("REGISTER.onclick... => sending register form", (done) =>{
            chai.request(testServer)
                .post('/todo')
                .type('form')
                .send({"to_do": "register"})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        describe("registering user", () => {
            it("submitting user details in registering form", (done) =>{
                chai.request(testServer)
                    .post('/register')
                    .type('form')
                    .send({
                        User_id: 'vasin',
                        First_Name: 'sreyas',
                        Last_Name: 'sree',
                        Email_id: 'sreya@example.com',
                        Phone_number: '765433',
                        Address: 'miriyalguda'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        (res.body).should.be.a('object');
                        done();
                    });
            });
        });

    });
    describe("view details", () => {
        it("CHECK.onclick... => displays user details ", (done) =>{
            chai.request(testServer)
                .post('/check')
                .type('form')
                .send({User_id: 'vasin'})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        describe("update", () =>{
            it("UPDATE.onclick update user details", (done) => {
                chai.request(testServer)
                    .post('/todo')
                    .type('form')
                    .send({to_do: "update"})
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
            describe("updating user", () => {
                it("submitting user details in updating form", (done) =>{
                    chai.request(testServer)
                        .post('/update')
                        .type('form')
                        .send({
                            First_Name: 'sreyas',
                            Last_Name: 'yara',
                            Email_id: 'sreya@example.com',
                            Phone_number: '765433',
                            Address: 'miriyalguda'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            (res.body).should.be.a('object');
                            done();
                        });
                });
            });
        });
        describe("delete", () =>{
            it("DELETE.onclick... => delete user details", (done) => {
                chai.request(testServer)
                    .post('/todo')
                    .type('form')
                    .send({to_do: "delete"})
                    .end((err, res) => {
                    res.should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
            }); 
        });
    
    });
});