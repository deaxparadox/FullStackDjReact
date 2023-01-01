"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
(function () {
    const api_url = `http://localhost:8000/api/login/`;
    const todo_url = `http://localhost:8000/api/todos/`;
    const credentials = JSON.stringify({
        username: "Nitish",
        password: "nk.@D136900"
    });
    axios_1.default
        .post(api_url, credentials)
        .then(res => {
        console.log(res.status);
        const token = res.data.token;
        axios_1.default.get(todo_url, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then((res) => {
            console.log(res.status);
            res.data.map((e) => console.log(e));
        })
            .catch((e) => {
            console.log(e);
        });
    })
        .catch((e) => {
        console.log(e);
    });
})();
