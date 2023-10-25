import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.getPlayerNameById = function(id, players) {
    console.log(id);
    const player = players.filter(
        element => {
            return element.id == id;
        }
    )[0];
    const firstName = player.first_name;
    const lastName = player.second_name;
    const fullName = firstName + " " + lastName;
    return fullName;
}

var gw = 0;

app.get("/", async (req,res) => {
    try {
        const response = await axios.get("https://fantasy.premierleague.com/api/bootstrap-static/");
        const result = response.data;
        res.render("index.ejs", { data: result, gw: gw });
    } catch (error) {
        res.status(404).send(error);
    }
})

app.post("/", async (req, res) => {
    try {
        const response = await axios.get("https://fantasy.premierleague.com/api/bootstrap-static/");
        const result = response.data;
        gw = req.body.gw - 1;
        const selected_gw = result.events.filter(
            data => {
                return data.id == gw;
            }
        );
        console.log(selected_gw);
        res.render("index.ejs", { data: result, gw: gw});
    } catch (error) {
        res.status(404).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });