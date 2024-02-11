const express = require("express");
const { Router } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const { isInvalidFields, getInvalidFields } = require("./helper.js");

const app = express();
const router = Router();
const port = 9090;

app.use(cors());
const jsonParser = bodyParser.json();

router.post("/registration", (req, res) => {
    if (Math.random() > 0.5) {
        res.statusCode = 400;

        setTimeout(() => {
            res.send({
                status: "error",
                message: "Bad request",
            });
        }, Math.random() * 1000);

        return;
    }

    setTimeout(() => {
        res.statusCode = 200;
        res.send({
            status: "success",
            message: "You are registered",
        });
    }, Math.random() * 1000);
});

router.get("/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});

router.post("/feedback", jsonParser, (req, res) => {
    const fields = getInvalidFields(req.body)

    if (isInvalidFields(fields)) {
        res.send({
            status: "error",
            fields: fields,
        })
    } else {
        res.send({
            status: "success",
            msg: "Ваша заявка успешно отправлена",
        })
    }
})
app.use("/api/", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports.handler = serverless(app);