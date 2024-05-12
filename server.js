const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
const db = mongoose.connection
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const User = require("./models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: "3d" })
}

app.set("port", process.env.PORT || 8080);
app.locals.title = "StackPedia API";

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});

// GET HOME
app.get("/", (request, response) => {
  response.send("Welcome to StackPedia API");
});

// GET ALL TECHS
app.get("/api/v1/technologies/all", async (request, response) => {

  try {
    const techs = await db.db.collection("technologies").find({}).toArray();
    response.status(200).json(techs);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
});

// GET TECH BY CATEGORY
app.get("/api/v1/technologies/:category", async (request, response) => {
  const target = request.params.category;

  try {
    const techs = await db.db.collection("technologies").find({ overall_type: `${target}` }).toArray();
    response.status(200).json(techs);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
});

// GET SINGLE TECH
app.get("/api/v1/technology/:id", async (request, response) => {
  const targetId = request.params.id;
  try {
    const stack = await db.collection("technologies").findOne({ _id: ObjectId.createFromHexString(targetId) })
    if(!stack) {
      return response.status(404).json({ error: "Document not found" })
    }
    response.status(200).json(stack);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
});

// GET ALL STACKS
app.get("/api/v1/stacks/all", async (request, response) => {
  try {
    const stacks = await db.db.collection("stacks").find({}).toArray();
    response.status(200).json(stacks);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
});

// GET STACKS BY TYPE
app.get("/api/v1/stacks/:type", async (request, response) => {
  const targetType = request.params.type;
 
  try {
    const stacks = await db.db.collection("stacks").find({ type: `${targetType}` }).toArray();
    response.status(200).json(stacks);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
});

// GET SINGLE STACK
app.get("/api/v1/stack/:id", async (request, response) => {
  const targetId = request.params.id;
  try {
    const stack = await db.collection("stacks").findOne({ _id: ObjectId.createFromHexString(targetId) })
    if(!stack) {
      return response.status(404).json({ error: "Document not found" })
    }
    response.status(200).json(stack);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
})

app.post("/api/v1/user/signup", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.signup(email, password)

    //create token
    const token = createToken(user._id)
    
    response.status(200).json({ email, token })
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
})

app.post("/api/v1/user/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password)

    //create token
    const token = createToken(user._id)

    response.status(200).json({ email, token })
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
})


