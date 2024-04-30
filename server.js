const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
const db = mongoose.connection
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
const Tech = require("./models/Tech");

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
app.get("/api/v1/technology/:name", async (request, response) => {
  const name = request.params.name.toLowerCase().replace("-", " ");
  function capitalizeWords(str) {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  const searchName = capitalizeWords(name);
  
  try {
    const tech = await db.db.collection("technologies").findOne({ name: `${searchName}` })
    response.status(200).json(tech);
  } catch(error) {
    console.error("Error retrieving documents:", error)
    response.status(500).json({error: "Internal server error"})
  }
});

// GET ALL STACKS
app.get("/api/v1/stacks/all", (request, response) => {
  const all = app.locals.data.stacks

  response.send(all);
});

// GET STACKS BY TYPE
app.get("/api/v1/stacks/:type", (request, response) => {
  const targetType = request.params.type;
  const stacks = app.locals.data.stacks.filter((stack) => {
    return stack.type === targetType;
  })
  if(!stacks) {
    response.sendStatus(404);
  }
  response.send(stacks);
});

// GET SINGLE STACK
app.get("/api/v1/stacks/:type/:name", (request, response) => {
  const targetType = request.params.type;
  const targetName = request.params.name.toLowerCase().replace("-", " ");
  const targetGroup = app.locals.data.stacks.filter((stack) => {
    return stack.type === targetType;
  })
  const targetStack = targetGroup.find((stack) => {
    return stack.name.toLowerCase() === targetName;
  })
  if(!targetGroup || !targetStack) {
    response.sendStatus(404);
  }
  response.send(targetStack)
})


app.locals.data = {
  languages: [
    {
      name: "Python",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Guido van Rossum",
      compatibilities: ["Django", "Flask", "NumPy", "Pandas"],
      date_created: "1991-02-20",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
      image2_url:
        "https://cdn.ourcodeworld.com/public-media/articles/articleocw-5c65fbda1ea05.jpg",
      use_cases: [
        "Web Development",
        "Data Analysis",
        "Machine Learning",
        "Automation",
      ],
      documentation_link: "https://docs.python.org/3/",
      summary:
        "Python is a versatile programming language known for its simplicity and readability. It is widely used in web development, data analysis, machine learning, and automation.",
    },
    {
      name: "Java",
      type: "Programming Language",
      overall_type: "languages",
      creator: "James Gosling",
      compatibilities: ["Spring Boot", "Hibernate", "Apache Kafka"],
      date_created: "1995-05-23",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
      image2_url: "https://qbitcode.com/wp-content/uploads/2023/08/java.webp",
      use_cases: [
        "Enterprise Applications",
        "Android Development",
        "Big Data Processing",
      ],
      documentation_link: "https://docs.oracle.com/en/java/",
      summary:
        "Java is a widely-used programming language known for its platform independence and robustness. It is commonly used for building enterprise applications, Android apps, and processing big data.",
    },
    {
      name: "JavaScript",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Brendan Eich",
      compatibilities: ["React", "Angular", "Node.js"],
      date_created: "1995-12-04",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png",
      image2_url:
        "https://www.noobpreneur.com/wp-content/uploads/2019/08/Javascript-810.jpg",
      use_cases: [
        "Web Development",
        "Frontend Development",
        "Server-side Development",
      ],
      documentation_link:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      summary:
        "JavaScript is a versatile programming language primarily used for building interactive web applications. It runs on the client-side in web browsers and server-side with Node.js.",
    },
    {
      name: "C++",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Bjarne Stroustrup",
      compatibilities: ["Qt", "Boost"],
      date_created: "1985-10-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1920px-ISO_C%2B%2B_Logo.svg.png",
      image2_url:
        "https://qph.cf2.quoracdn.net/main-qimg-9efba3b88a2e2ede86e1d7fb39c807f2",
      use_cases: [
        "System/Kernel Programming",
        "Game Development",
        "Embedded Systems",
      ],
      documentation_link: "https://en.cppreference.com/w/",
      summary:
        "C++ is a powerful and efficient programming language commonly used for system and kernel programming, game development, and building applications for embedded systems.",
    },
    {
      name: "Ruby",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Yukihiro Matsumoto",
      compatibilities: ["Ruby on Rails"],
      date_created: "1995-12-21",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png",
      image2_url:
        "https://cdn.geekboots.com/geek/ruby-programming-meta-1683275779432.jpg",
      use_cases: ["Web Development", "Prototyping", "Automation"],
      documentation_link: "https://www.ruby-lang.org/en/documentation/",
      summary:
        "Ruby is a dynamic, object-oriented programming language known for its simplicity and productivity. It is commonly used for web development, prototyping, and automation tasks.",
    },
    {
      name: "Go",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Robert Griesemer, Rob Pike, Ken Thompson",
      compatibilities: ["Gin", "Beego"],
      date_created: "2009-11-10",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1920px-Go_Logo_Blue.svg.png",
      image2_url:
        "https://codecondo.com/wp-content/uploads/2017/11/Go-Programming.jpg",
      use_cases: ["Backend Development", "Cloud Services", "Networking"],
      documentation_link: "https://golang.org/doc/",
      summary:
        "Go, also known as Golang, is a statically typed, compiled programming language designed for simplicity and efficiency. It is widely used for building backend services, cloud applications, and network programs.",
    },
    {
      name: "Swift",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Chris Lattner",
      compatibilities: ["UIKit", "SwiftUI"],
      date_created: "2014-06-02",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/1200px-Swift_logo.svg.png",
      image2_url:
        "https://9series.com/blog/wp-content/uploads/2016/10/s-Swift-A-Unique-Programming-Language-for-iOS.jpg",
      use_cases: ["iOS Development", "macOS Development", "App Development"],
      documentation_link: "https://swift.org/documentation/",
      summary:
        "Swift is a powerful and intuitive programming language developed by Apple for building iOS, macOS, watchOS, and tvOS applications. It offers modern features and safety by design.",
    },
    {
      name: "PHP",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Rasmus Lerdorf",
      compatibilities: ["Laravel", "Symfony"],
      date_created: "1994-06-08",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png",
      image2_url:
        "https://qph.cf2.quoracdn.net/main-qimg-d90493c98759e01faccd4c3fd67aa764",
      use_cases: [
        "Web Development",
        "Server-side Scripting",
        "Content Management Systems",
      ],
      documentation_link: "https://www.php.net/docs.php",
      summary:
        "PHP is a popular server-side scripting language used for web development and building dynamic web pages. It is widely supported and integrates well with various databases and web servers.",
    },
    {
      name: "Rust",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Mozilla Research",
      compatibilities: ["Rocket", "Actix"],
      date_created: "2010-07-07",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1920px-Rust_programming_language_black_logo.svg.png",
      image2_url:
        "https://media.licdn.com/dms/image/D5612AQG_VNcB7VI-Cw/article-cover_image-shrink_600_2000/0/1681973828533?e=2147483647&v=beta&t=Lk1HvaWbG8R1-4ivpg0qSj7fC5z-VsItGXrduXA_t7Y",
      use_cases: ["Systems Programming", "Web Assembly", "Game Development"],
      documentation_link: "https://www.rust-lang.org/learn",
      summary:
        "Rust is a systems programming language that offers memory safety, concurrency, and performance. It is suitable for building low-level systems, web assembly modules, and high-performance applications.",
    },
    {
      name: "Kotlin",
      type: "Programming Language",
      overall_type: "languages",
      creator: "JetBrains",
      compatibilities: ["Android", "Spring Boot", "Gradle"],
      date_created: "2011-07-20",
      image_url:
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/kotlin.svg",
      image2_url:
        "https://serbian.tech/wp-content/uploads/2021/05/louis-tsai-lqcvMiBABHw-unsplash-1024x768.jpg",
      use_cases: [
        "Android App Development",
        "Backend Development",
        "Cross-platform Development",
      ],
      documentation_link: "https://kotlinlang.org/docs/home.html",
      summary:
        "Kotlin is a statically typed programming language developed by JetBrains. It is designed to interoperate fully with Java, making it a popular choice for Android app development and backend development. Kotlin offers concise syntax, null safety, and functional programming features.",
    },
    {
      name: "TypeScript",
      type: "Programming Language",
      overall_type: "languages",
      creator: "Microsoft",
      compatibilities: ["React", "Angular"],
      date_created: "2012-10-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
      image2_url:
        "https://www.securityjourney.com/hubfs/Blog/TypeScript/SJ2022_Blog_TypeScriptLanguage.jpg#keepProtocol",
      use_cases: [
        "Large-scale JavaScript Development",
        "Frontend Development",
        "Backend Development",
      ],
      documentation_link: "https://www.typescriptlang.org/docs/",
      summary:
        "TypeScript is a typed superset of JavaScript developed by Microsoft. It adds static types, interfaces, and other features to JavaScript, making it more scalable and maintainable. It is widely used for large-scale frontend and backend development.",
    },
  ],
  libraries: [
    {
      name: "React",
      type: "JavaScript Library",
      overall_type: "libraries",
      creator: "Facebook",
      compatibilities: ["JavaScript", "TypeScript"],
      date_created: "2013-05-29",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
      image2_url:
        "https://www.osedea.com/static/50a729cbf01055de07982ec9d064467c/d84c6/lautaro-andreani-xkbaqlcqeb4-unsplash.jpg",
      use_cases: [
        "Single Page Applications",
        "UI Components",
        "Frontend Development",
      ],
      documentation_link: "https://react.dev/",
      summary:
        "React is a JavaScript library for building user interfaces, particularly for single-page applications. It is maintained by Facebook and a community of individual developers and companies.",
    },
    {
      name: "jQuery",
      type: "JavaScript Library",
      overall_type: "libraries",
      creator: "John Resig",
      compatibilities: ["JavaScript"],
      date_created: "2006-08-26",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JQuery_logo.svg/1920px-JQuery_logo.svg.png",
      image2_url:
        "https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fsbn71yujt0f3ug5k1mvs.jpeg",
      use_cases: ["DOM Manipulation", "Event Handling", "AJAX"],
      documentation_link: "https://api.jquery.com/",
      summary:
        "jQuery is a fast, small, and feature-rich JavaScript library for simplifying HTML document traversing, event handling, and animating. It is widely used for DOM manipulation and AJAX requests.",
    },
    {
      name: "NumPy",
      type: "Python Library",
      overall_type: "libraries",
      creator: "Travis Oliphant",
      compatibilities: ["Python"],
      date_created: "2006-08-26",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/NumPy_logo.svg/1200px-NumPy_logo.svg.png",
      image2_url:
        "https://media.licdn.com/dms/image/D4D12AQGnM_JZqmIGEA/article-cover_image-shrink_720_1280/0/1686919973736?e=2147483647&v=beta&t=ceqwE8bMznyzwgcZxN-UyWOk3RuR0aBmZFHxsYFb_ak",
      use_cases: ["Numerical Computing", "Data Analysis", "Machine Learning"],
      documentation_link: "https://numpy.org/doc/",
      summary:
        "NumPy is a fundamental package for scientific computing with Python. It provides support for multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on these arrays efficiently.",
    },
    {
      name: "Pandas",
      type: "Python Library",
      overall_type: "libraries",
      creator: "Wes McKinney",
      compatibilities: ["Python"],
      date_created: "2008-11-07",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/1200px-Pandas_logo.svg.png",
      image2_url:
        "https://i0.wp.com/indianaiproduction.com/wp-content/uploads/2019/07/Python-Pandas-Tutorial.png?fit=1280%2C720&ssl=1",
      use_cases: ["Data Manipulation", "Data Analysis", "Time Series Analysis"],
      documentation_link: "https://pandas.pydata.org/docs/",
      summary:
        "Pandas is a powerful and flexible open-source data analysis and manipulation library built on top of the Python programming language. It provides data structures and functions for efficiently working with structured data.",
    },
    {
      name: "Hibernate",
      type: "Java Library",
      overall_type: "libraries",
      creator: "Gavin King",
      compatibilities: ["Java"],
      date_created: "2001-09-01",
      image_url:
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hibernate.svg",
      image2_url:
        "https://seldomindia.com/wp-content/uploads/2023/12/hibernate-java-1.jpg",
      use_cases: [
        "Object-Relational Mapping",
        "Database Interaction",
        "Data Persistence",
      ],
      documentation_link: "https://hibernate.org/orm/documentation/",
      summary:
        "Hibernate is an object-relational mapping (ORM) library for Java. It provides a framework for mapping an object-oriented domain model to a relational database, simplifying database access and improving application maintainability.",
    },
    {
      name: "Boost",
      type: "C++ Library",
      overall_type: "libraries",
      creator: "Boris Schäling",
      compatibilities: ["C++"],
      date_created: "2001-01-01",
      image_url:
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/boost.svg",
      image2_url:
        "https://cdn.educba.com/academy/wp-content/uploads/2020/10/C-Boost.jpg",
      use_cases: [
        "General Purpose Programming",
        "Advanced Data Structures",
        "Concurrency",
      ],
      documentation_link: "https://www.boost.org/doc/",
      summary:
        "Boost is a collection of free, peer-reviewed C++ libraries that provide support for tasks and structures such as linear algebra, pseudorandom number generation, multithreading, image processing, regular expressions, and unit testing. It is widely used in both open-source and commercial projects.",
    },
  ],
  frameworks: [
    {
      name: "Django",
      type: "Web Framework",
      overall_type: "frameworks",
      creator: "Adrian Holovaty, Simon Willison",
      compatibilities: ["Python"],
      date_created: "2005-07-21",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Django_logo.svg/1200px-Django_logo.svg.png",
      image2_url:
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/285622826/original/cf424ced94d6180acc0e71160d8f841aab239121/develop-website-with-django-python-full-stack-developer-fe99.jpg",
      use_cases: ["Web Development", "Backend Development", "API Development"],
      documentation_link: "https://docs.djangoproject.com/en/stable/",
      summary:
        "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It is used for building web applications, APIs, and content management systems.",
    },
    {
      name: "Flask",
      type: "Web Framework",
      overall_type: "frameworks",
      creator: "Armin Ronacher",
      compatibilities: ["Python"],
      date_created: "2010-04-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flask_logo.svg/1200px-Flask_logo.svg.png",
      image2_url: "https://cdn.hackersandslackers.com/2020/02/flask-intro.jpg",
      use_cases: ["Microservices", "API Development", "Prototyping"],
      documentation_link: "https://flask.palletsprojects.com/en/2.1.x/",
      summary:
        "Flask is a lightweight Python web framework designed for building web applications with minimal effort. It is simple, flexible, and easy to learn, making it suitable for small to medium-sized projects.",
    },
    {
      name: "Spring Boot",
      type: "Java Framework",
      overall_type: "frameworks",
      creator: "Pivotal Software",
      compatibilities: ["Java"],
      date_created: "2014-04-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/1200px-Spring_Framework_Logo_2018.svg.png",
      image2_url:
        "https://assets-global.website-files.com/63e3d6905bacd6855fa38c1c/63e3d6905bacd6ff47a390cc_THUMB_%20Advantages%20of%20Spring%20Boot-min.jpg",
      use_cases: [
        "Enterprise Applications",
        "Microservices",
        "RESTful Services",
      ],
      documentation_link:
        "https://docs.spring.io/spring-boot/docs/current/reference/html/",
      summary:
        "Spring Boot is an open-source Java-based framework used for building standalone, production-grade Spring-based applications. It simplifies the development process by providing defaults for configurations and eliminating boilerplate code.",
    },
    {
      name: "Express.js",
      type: "Node.js Framework",
      overall_type: "frameworks",
      creator: "TJ Holowaychuk",
      compatibilities: ["Node.js"],
      date_created: "2010-11-16",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/1280px-Expressjs.png",
      image2_url:
        "https://miro.medium.com/v2/resize:fit:805/1*7fe7SkSNP6Y8PvTRm4Jl6Q.png",
      use_cases: ["Web Applications", "API Services", "Microservices"],
      documentation_link: "https://expressjs.com/",
      summary:
        "Express.js is a minimalist web application framework for Node.js, designed for building web applications and APIs. It provides a robust set of features for web and mobile applications.",
    },
    {
      name: "Ruby on Rails",
      type: "Ruby Framework",
      overall_type: "frameworks",
      creator: "David Heinemeier Hansson",
      compatibilities: ["Ruby"],
      date_created: "2004-12-13",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png",
      image2_url:
        "https://twinslash.com/assets/images/uploads/ruby-on-rails-development.jpg",
      use_cases: ["Web Development", "API Development", "SaaS Applications"],
      documentation_link: "https://guides.rubyonrails.org/",
      summary:
        "Ruby on Rails is a popular web application framework written in Ruby. It follows the Model-View-Controller (MVC) architectural pattern and emphasizes convention over configuration, enabling rapid development of web applications.",
    },
    {
      name: "ASP.NET",
      type: "Framework",
      overall_type: "frameworks",
      creator: "Microsoft",
      compatibilities: ["C#"],
      date_created: "2002-01-05",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1200px-.NET_Core_Logo.svg.png",
      image2_url:
        "https://www.aceinfoway.com/blog/wp-content/uploads/2020/05/top-5-benefits-of-using-aspnet-core.jpg",
      use_cases: [
        "Web Development",
        "Enterprise Applications",
        "Cloud Services",
      ],
      documentation_link: "https://dotnet.microsoft.com/apps/aspnet",
      summary:
        "ASP.NET is a web application framework developed by Microsoft for building dynamic web sites, web applications, and web services. It provides a powerful, flexible, and extensible platform for developing a wide range of applications.",
    },
    {
      name: "Laravel",
      type: "PHP Framework",
      overall_type: "frameworks",
      creator: "Taylor Otwell",
      compatibilities: ["PHP"],
      date_created: "2011-06-09",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1024px-Laravel.svg.png",
      image2_url:
        "https://cdn.hdwebsoft.com/wp-content/uploads/2021/11/Thiet-ke-chua-co-ten-4.jpg.webp",
      use_cases: ["Web Development", "API Development", "Microservices"],
      documentation_link: "https://laravel.com/docs/8.x",
      summary:
        "Laravel is a free, open-source PHP web framework used for building web applications following the Model-View-Controller (MVC) architectural pattern. It provides expressive syntax and tools for rapid development.",
    },
    {
      name: "Symfony",
      type: "PHP Framework",
      overall_type: "frameworks",
      creator: "Fabien Potencier",
      compatibilities: ["PHP"],
      date_created: "2005-10-18",
      image_url:
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/symfony.svg",
      image2_url: "https://toolapp.fr/wp-content/uploads/2023/02/symfony.webp",
      use_cases: ["Web Applications", "RESTful APIs", "Microservices"],
      documentation_link: "https://symfony.com/doc/current/index.html",
      summary:
        "Symfony is a PHP web application framework known for its modularity, scalability, and flexibility. It follows the model-view-controller (MVC) architectural pattern and provides a set of reusable PHP components for building web applications, RESTful APIs, and microservices.",
    },
    {
      name: "Vue.js",
      type: "JavaScript Framework",
      overall_type: "frameworks",
      creator: "Evan You",
      compatibilities: ["JavaScript"],
      date_created: "2014-02-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1920px-Vue.js_Logo_2.svg.png",
      image2_url:
        "https://www.valuecoders.com/blog/wp-content/uploads/2021/06/Vue.js-Use-Cases-1-1024x343.jpg",
      use_cases: [
        "Interactive Web Interfaces",
        "Single Page Applications",
        "UI Components",
      ],
      documentation_link: "https://vuejs.org/v2/guide/",
      summary:
        "Vue.js is a progressive JavaScript framework used for building user interfaces. It is designed from the ground up to be incrementally adoptable, allowing developers to add Vue.js to existing projects.",
    },
    {
      name: "Angular",
      type: "JavaScript Framework",
      overall_type: "frameworks",
      creator: "Google",
      compatibilities: ["JavaScript", "TypeScript"],
      date_created: "2010-10-20",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
      image2_url:
        "https://externlabs.com/blogs/wp-content/uploads/2021/11/angularjs-framework.jpg",
      use_cases: [
        "Large-scale Web Applications",
        "Single Page Applications",
        "UI Components",
      ],
      documentation_link: "https://angular.io/docs",
      summary:
        "Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It is maintained by Google and a community of developers and companies.",
    },
    {
      name: "TensorFlow",
      type: "Machine Learning Framework",
      overall_type: "frameworks",
      creator: "Google Brain Team",
      compatibilities: ["Python", "JavaScript"],
      date_created: "2015-11-09",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1920px-Tensorflow_logo.svg.png",
      image2_url:
        "https://miro.medium.com/v2/resize:fit:1097/1*aLnKWrG41f1SbExs59Txmw.jpeg",
      use_cases: [
        "Deep Learning",
        "Machine Learning Models",
        "Natural Language Processing",
      ],
      documentation_link: "https://www.tensorflow.org/guide",
      summary:
        "TensorFlow is an open-source machine learning framework developed by Google for building and training machine learning models. It provides a comprehensive ecosystem of tools, libraries, and community resources for deep learning.",
    },
    {
      name: "PyTorch",
      type: "Machine Learning Framework",
      overall_type: "frameworks",
      creator: "Facebook AI Research Lab",
      compatibilities: ["Python"],
      date_created: "2016-10-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pytorch_logo.png/1200px-Pytorch_logo.png",
      image2_url:
        "https://www.opensourceforu.com/wp-content/uploads/2023/02/PyTorch-1.jpg",
      use_cases: ["Deep Learning", "Neural Networks", "Computer Vision"],
      documentation_link: "https://pytorch.org/docs/stable/index.html",
      summary:
        "PyTorch is an open-source machine learning framework developed by Facebook's AI Research lab. It provides a flexible and dynamic computational graph approach for building and training neural networks.",
    },
    {
      name: "Qt",
      type: "C++ Framework",
      overall_type: "frameworks",
      creator: "Qt Company",
      compatibilities: ["C++"],
      date_created: "1991-05-20",
      image_url:
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/qt.svg",
      image2_url:
        "https://lembergsolutions.com/sites/default/files/styles/metatags_large/public/2023-05/Why-choose-Qt%20framework-lemberg-solutions%20-%20meta%20Image.png?itok=rsEI5f5j",
      use_cases: [
        "Cross-platform Application Development",
        "GUI Development",
        "Embedded Systems",
      ],
      documentation_link: "https://doc.qt.io/",
      summary:
        "Qt is a comprehensive C++ framework used for developing cross-platform applications and graphical user interfaces (GUIs). It provides a set of tools, libraries, and APIs for building applications for desktop, mobile, and embedded systems. Qt is known for its ease of use, performance, and extensive documentation.",
    },
    {
      name: "Gin",
      type: "Go Web Framework",
      overall_type: "frameworks",
      creator: "Manu Carusso",
      compatibilities: ["Go"],
      date_created: "2014-04-21",
      image_url:
        "https://assets-global.website-files.com/63f08f94fb9f06134f8c54eb/643f7baf66296a66bf2c1036_gin.png",
      image2_url:
        "https://opengraph.githubassets.com/78a3a34cb342562aed5f22c68811ab9199ffb11282dfd61e48f495f0d4466a6f/gin-gonic/gin",
      use_cases: ["Web Development", "API Services", "Microservices"],
      documentation_link: "https://gin-gonic.com/docs/",
      summary:
        "Gin is a web framework written in Go (Golang). It features a Martini-like API with much better performance, up to 40 times faster. It's a great choice for building RESTful APIs and web services in Go with minimal overhead and high performance.",
    },
    {
      name: "Beego",
      type: "Go Framework",
      overall_type: "frameworks",
      creator: "astaxie",
      compatibilities: ["Go"],
      date_created: "2012-05-02",
      image_url:
        "https://www.bacancytechnology.com/blog/wp-content/uploads/2022/12/Beego.webp",
      image2_url: "https://i.morioh.com/210305/29518374.webp",
      use_cases: [
        "Web Applications",
        "API Development",
        "High-performance Apps",
      ],
      documentation_link: "https://beego.me/docs/intro/",
      summary:
        "Beego is a high-performance Go framework for building web applications and APIs. It follows the MVC architecture, provides powerful features out of the box, and is easy to learn and use.",
    },
  ],
  databases: [
    {
      name: "MySQL",
      type: "Relational Database",
      overall_type: "databases",
      creator: "MySQL AB",
      compatibilities: ["PHP", "Java", "Python"],
      date_created: "1995-05-23",
      image_url:
        "https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png",
      image2_url:
        "https://assets-global.website-files.com/5aa7081220a301f2a3644f3b/5ad1034b0f7efded04f1567e_mysql.jpg",
      use_cases: [
        "Web Applications",
        "Content Management Systems",
        "Data Warehousing",
      ],
      documentation_link: "https://dev.mysql.com/doc/",
      summary:
        "MySQL is an open-source relational database management system (RDBMS) developed by MySQL AB, now owned by Oracle Corporation. It is widely used for building web applications, content management systems, and data warehousing solutions.",
    },
    {
      name: "PostgreSQL",
      type: "Relational Database",
      overall_type: "databases",
      creator: "PostgreSQL Global Development Group",
      compatibilities: ["Python", "Ruby", "Java"],
      date_created: "1996-07-08",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1920px-Postgresql_elephant.svg.png",
      image2_url:
        "https://www.somoslibres.org/images/2022/07/12/postgresql.jpg",
      use_cases: [
        "Web Applications",
        "Geographic Information Systems",
        "Data Warehousing",
      ],
      documentation_link: "https://www.postgresql.org/docs/",
      summary:
        "PostgreSQL is a powerful, open-source object-relational database system known for its reliability, robustness, and feature set. It is widely used for building web applications, geographic information systems, and data warehousing solutions.",
    },
    {
      name: "MongoDB",
      type: "NoSQL Database",
      overall_type: "databases",
      creator: "MongoDB Inc.",
      compatibilities: ["JavaScript", "Python", "Java"],
      date_created: "2009-02-11",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png",
      image2_url:
        "https://www.loginradius.com/blog/static/504642ca3a1f7d78dea8509436faa4c6/701ee/cover.jpg",
      use_cases: [
        "Big Data",
        "Content Management Systems",
        "Real-time Analytics",
      ],
      documentation_link: "https://docs.mongodb.com/",
      summary:
        "MongoDB is a cross-platform, document-oriented NoSQL database designed for flexibility, scalability, and performance. It stores data in flexible, JSON-like documents and is widely used for big data, content management systems, and real-time analytics.",
    },
  ],
  servers: [
    {
      name: "Node.js",
      type: "Server-side JavaScript Runtime",
      overall_type: "servers",
      creator: "Ryan Dahl",
      compatibilities: ["Express.js", "Socket.io"],
      date_created: "2009-05-27",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png",
      image2_url:
        "https://www.orientsoftware.com/Themes/OrientSoftwareTheme/Content/Images/blog/2024-01-23/node-js-glimpse.jpg",
      use_cases: ["Web Applications", "API Services", "Real-time Applications"],
      documentation_link: "https://nodejs.org/en/docs/",
      summary:
        "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is lightweight and efficient, allowing developers to build scalable network applications. It is commonly used for building web servers and real-time applications.",
    },
    {
      name: "Apache HTTP Server",
      type: "Web Server",
      overall_type: "servers",
      creator: "Apache Software Foundation",
      compatibilities: ["Versatile range of technologies"],
      date_created: "1995-04-01",
      image_url: "https://www.apache.org/foundation/press/kit/asf_logo.png",
      image2_url:
        "https://130e178e8f8ba617604b-8aedd782b7d22cfe0d1146da69a52436.ssl.cf1.rackcdn.com/apache-releases-update-for-leading-http-server-showcase_image-2-a-18208.jpg",
      use_cases: [
        "Hosting Websites",
        "Serving Static Content",
        "Reverse Proxy",
      ],
      documentation_link: "https://httpd.apache.org/docs/",
      summary:
        "The Apache HTTP Server, commonly referred to as Apache, is a free and open-source cross-platform web server software. It is widely used for hosting websites, serving static content, and as a reverse proxy server.",
    },
    {
      name: "Nginx",
      type: "Web Server",
      overall_type: "servers",
      creator: "Igor Sysoev",
      compatibilities: ["Versatile range of technologies"],
      date_created: "2004-10-04",
      image_url:
        "https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png",
      image2_url: "https://i.ytimg.com/vi/D5grhfkjjXE/maxresdefault.jpg",
      use_cases: [
        "High-performance Websites",
        "Load Balancing",
        "Reverse Proxy",
      ],
      documentation_link: "https://nginx.org/en/docs/",
      summary:
        "Nginx is a free, open-source, high-performance web server and reverse proxy server. It is known for its stability, scalability, and low resource consumption. It is commonly used for serving high-traffic websites, load balancing, and reverse proxying.",
    },
    {
      name: "Microsoft Internet Information Services (IIS)",
      type: "Web Server",
      overall_type: "servers",
      creator: "Microsoft",
      compatibilities: [".NET Framework", "C#"],
      date_created: "1995-12-06",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vbOxSEhHPxjz4z3CrgzDUfXcx-wK4vGC-bP-OCUA1A&s",
      image2_url:
        "https://miro.medium.com/v2/resize:fit:720/1*ICwnkhXZ_IOJREt1ut2TYA.png",
      use_cases: [
        "Hosting ASP.NET Applications",
        "Windows Server Integration",
        "FTP Server",
      ],
      documentation_link: "https://docs.microsoft.com/en-us/iis/",
      summary:
        "Internet Information Services (IIS) is a flexible, secure, and manageable web server provided by Microsoft. It is used for hosting ASP.NET web applications, integrating with Windows Server, and serving FTP sites.",
    },
    {
      name: "Docker",
      type: "Containerization Platform",
      overall_type: "servers",
      creator: "Docker, Inc.",
      compatibilities: ["Any application"],
      date_created: "2013-03-20",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1920px-Docker_%28container_engine%29_logo.svg.png",
      image2_url:
        "https://miro.medium.com/v2/resize:fit:1400/0*Ju0B9aFR7AGUvc5s",
      use_cases: [
        "Containerization",
        "Microservices",
        "Continuous Integration/Continuous Deployment (CI/CD)",
      ],
      documentation_link: "https://docs.docker.com/",
      summary:
        "Docker is a platform for developing, shipping, and running applications inside containers. It provides a standardized way to package applications and their dependencies into lightweight, portable containers, enabling scalability, consistency, and efficiency across different environments.",
    },
    {
      name: "Kubernetes",
      type: "Container Orchestration Platform",
      overall_type: "servers",
      creator: "Google",
      compatibilities: ["Docker"],
      date_created: "2014-06-07",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kubernetes_logo.svg/1920px-Kubernetes_logo.svg.png",
      image2_url:
        "https://miro.medium.com/v2/resize:fit:1400/1*SOhDdB1GYP_scqZTXoWC2g.png",
      use_cases: [
        "Container Orchestration",
        "Microservices Architecture",
        "Cloud-native Applications",
      ],
      documentation_link: "https://kubernetes.io/docs/",
      summary:
        "Kubernetes is an open-source container orchestration platform for automating deployment, scaling, and management of containerized applications. It provides a framework for building resilient, scalable, and self-healing distributed systems.",
    },
    {
      name: "Apache Tomcat",
      type: "Servlet Container",
      overall_type: "servers",
      creator: "Apache Software Foundation",
      compatibilities: ["Java"],
      date_created: "1999-12-14",
      image_url:
        "https://webhostinggeeks.com/blog/wp-content/uploads/2023/05/Apache-Tomcat-Web-Server.png",
      image2_url: "https://rhisac.org/wp-content/uploads/apachetomcat.jpg",
      use_cases: [
        "Java Servlets",
        "JavaServer Pages (JSP)",
        "Java EE Applications",
      ],
      documentation_link: "https://tomcat.apache.org/tomcat-9.0-doc/index.html",
      summary:
        "Apache Tomcat is an open-source Java servlet container developed by the Apache Software Foundation. It implements the Java Servlet, JavaServer Pages (JSP), and Java Expression Language (EL) specifications, providing a web server environment for Java-based web applications.",
    },
    {
      name: "Ruby on Rails (Puma)",
      type: "Web Server",
      overall_type: "servers",
      creator: "David Heinemeier Hansson, Evan Phoenix",
      compatibilities: ["Ruby on Rails"],
      date_created: "2010-12-10",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png",
      image2_url:
        "https://repository-images.githubusercontent.com/2441517/7510b380-cfe5-11e9-8391-85577ac28ede",
      use_cases: ["Web Applications", "API Services", "Microservices"],
      documentation_link: "https://puma.io/",
      summary:
        "Puma is a concurrent web server for Ruby applications. It is a multithreaded, non-blocking web server designed for high-performance Ruby applications, particularly those built with Ruby on Rails.",
    },
  ],
  clouds: [
    {
      name: "Amazon Web Services (AWS)",
      type: "Cloud Platform",
      overall_type: "clouds",
      creator: "Amazon",
      compatibilities: ["Various Databases"],
      date_created: "2006-03-14",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1920px-Amazon_Web_Services_Logo.svg.png",
      image2_url:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_aws.jpg",
      use_cases: ["Cloud Computing", "Web Hosting", "Data Storage"],
      documentation_link: "https://docs.aws.amazon.com/",
      summary:
        "Amazon Web Services (AWS) is a comprehensive, evolving cloud computing platform provided by Amazon. It offers a wide range of services including computing power, storage, databases, analytics, machine learning, and more, allowing businesses to scale and grow.",
    },
    {
      name: "Microsoft Azure",
      type: "Cloud Platform",
      overall_type: "clouds",
      creator: "Microsoft",
      compatibilities: ["Various Databases"],
      date_created: "2010-02-01",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/1920px-Microsoft_Azure_Logo.svg.png",
      image2_url: "https://s3-prod.autonews.com/s3fs-public/micosoft-azure.png",
      use_cases: ["Cloud Computing", "App Hosting", "Big Data Analytics"],
      documentation_link: "https://docs.microsoft.com/en-us/azure/",
      summary:
        "Microsoft Azure is a cloud computing platform and services provided by Microsoft. It offers a wide range of cloud services, including computing, analytics, storage, and networking, to help businesses build, deploy, and manage applications securely and efficiently.",
    },
    {
      name: "Google Cloud Platform (GCP)",
      type: "Cloud Platform",
      overall_type: "clouds",
      creator: "Google",
      compatibilities: ["Various Databases"],
      date_created: "2008-04-07",
      image_url:
        "https://miro.medium.com/v2/resize:fit:1200/0*brH9cM9rnSRx2I-S.png",
      image2_url:
        "https://images.shiksha.com/mediadata/shikshaOnline/mailers/2021/naukri-learning/dec/20dec/Google-Cloud-Platform.png",
      use_cases: ["Cloud Computing", "Data Storage", "Machine Learning"],
      documentation_link: "https://cloud.google.com/docs",
      summary:
        "Google Cloud Platform (GCP) is a suite of cloud computing services provided by Google. It offers a wide range of services including computing, storage, databases, machine learning, and networking, enabling users to build and deploy applications on Google's infrastructure.",
    },
  ],
  stacks: [
    {
      name: "MERN Stack",
      image_url: "https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Stack_9437df2ba9_62af1dd3fc.png",
      image2_url: "https://nitsantech.com/fileadmin/ns_theme_ns2019/blog/_live/What_is_the_MERN_stack_and_how_do_I_use_it_/What_is_the_MERN_stack_and_how_do_I_use_it.jpg",
      type: "fullstack",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      benefits: [
        "Single language (JavaScript) for both client and server",
        "Rich ecosystem and community support",
        "High performance and scalability",
      ],
      downsides: [
        "Complexity in managing and debugging",
        "Steep learning curve for beginners",
      ],
      companies: ["Facebook", "Netflix", "Airbnb"],
      summary: "The MERN (MongoDB, Express.js, React, Node.js) stack is a fullstack JavaScript framework, featuring MongoDB for the database, Express.js for the backend framework, React for the frontend library, and Node.js for the JavaScript runtime environment.",
      learn_link: "https://www.mongodb.com/mern-stack"
    },
    {
      name: "MEAN Stack",
      image_url: "https://media.licdn.com/dms/image/D5612AQEFBusT1xvG7A/article-cover_image-shrink_600_2000/0/1690120721509?e=2147483647&v=beta&t=BfpKdXsXaRpWWciN4OjVs49zMd_P2LTBHRNpVBomqKE",
      image2_url: "https://www.weblineindia.com/wp-content/uploads/2016/12/mean-stack-1.jpg",
      type: "fullstack",
      technologies: ["MongoDB", "Express.js", "Angular", "Node.js"],
      benefits: [
        "Uses JavaScript throughout the stack",
        "JSON-based data exchange",
        "Highly scalable architecture",
      ],
      downsides: [
        "Angular's steep learning curve",
        "Lack of mature libraries and tools compared to other stacks",
      ],
      companies: ["Google", "Uber", "PayPal"],
      summary: "The MEAN (MongoDB, Express.js, Angular, Node.js) stack is a fullstack JavaScript framework, comprising MongoDB for the database, Express.js for the backend framework, Angular for the frontend framework, and Node.js for the JavaScript runtime environment.",
      learn_link: "https://www.ibm.com/topics/mean-stack"
    },
    {
      name: "LAMP Stack",
      image_url: "https://assets-global.website-files.com/622c950fafeaff443f77d857/635901fc4314c68586e2d056_lamp-stack-software-development.jpg",
      image2_url: "https://cdn.servermania.com/images/f_webp,q_auto:best/v1681848708/blog/What-is-a-LAMP-Stack-1/What-is-a-LAMP-Stack-1.png?_i=AA",
      type: "fullstack",
      technologies: ["Linux", "Apache", "MySQL", "PHP"],
      benefits: [
        "Widely adopted and established stack",
        "Affordable hosting options",
        "Large talent pool",
      ],
      downsides: [
        "Performance issues at scale",
        "Security vulnerabilities if not configured properly",
      ],
      companies: ["WordPress", "Yahoo", "Flickr"],
      summary: "The LAMP (Linux, Apache, MySQL, PHP) stack is a widely adopted open-source web development stack. It includes Linux as the operating system, Apache as the web server, MySQL as the relational database management system, and PHP as the server-side scripting language.",
      learn_link: "https://www.ibm.com/topics/lamp-stack"
    },
    {
      name: "Django Stack",
      image_url: "https://www.fullstackpython.com/img/logos/django.png",
      image2_url: "https://media.licdn.com/dms/image/D5622AQGoT1AN_pEcRw/feedshare-shrink_2048_1536/0/1701678392003?e=2147483647&v=beta&t=8MA9cAXfU3ViGo-d1zAon-9_fIVdoVb0aZ0r1daEF0c",
      type: "fullstack",
      technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
      benefits: [
        "Rapid development with Django's built-in features",
        "High security standards",
        "Scalable architecture",
      ],
      downsides: [
        "Limited flexibility compared to microservices architecture",
        "Learning curve for newcomers to Python",
      ],
      companies: ["Instagram", "Spotify", "Pinterest"],
      summary: "The Django stack is a robust full-stack framework built on Python, comprising Django for the backend framework, Django REST Framework for building RESTful APIs, and PostgreSQL for the relational database.",
      learn_link: "https://dev.to/koladev/building-a-fullstack-application-with-django-django-rest-nextjs-3e26"
    },
    {
      name: "Ruby on Rails Stack",
      image_url: "https://miro.medium.com/v2/resize:fit:1000/1*lEXUSkEm6M6kIHmKP9HtWg.png",
      image2_url: "https://www.emizentech.com/blog/wp-content/uploads/sites/2/2022/07/What-is-Rails-or-Ruby-on-Rails--scaled.jpg",
      type: "fullstack",
      technologies: ["Ruby", "Ruby on Rails", "SQLite", "JavaScript"],
      benefits: [
        "Convention over configuration for rapid development",
        "Large number of plugins (Gems) available",
        "Active and helpful community",
      ],
      downsides: [
        "Performance issues for highly concurrent applications",
        "Not suitable for CPU-intensive tasks",
      ],
      companies: ["GitHub", "Basecamp", "Airbnb"],
      summary: "The Ruby on Rails stack is a powerful full-stack framework built on Ruby, featuring Rails for the backend framework and SQLite for the database.",
      learn_link: "https://careerfoundry.com/en/blog/web-development/should-i-learn-ruby-on-rails/"
    },
    {
      name: "MEVN Stack",
      image_url: "https://miro.medium.com/v2/resize:fit:1400/0*RCKYpm1OQHHX1EXV.jpg",
      image2_url: "https://i.morioh.com/2020/04/27/a7f06a3c5568.jpg",
      type: "fullstack",
      technologies: ["MongoDB", "Express.js", "Vue.js", "Node.js"],
      benefits: [
        "Unified language (JavaScript) across the stack",
        "Scalable and modular architecture",
        "Rich ecosystem for frontend and backend development",
      ],
      downsides: [
        "Learning curve for Vue.js and Node.js",
        "Potential performance bottlenecks with MongoDB",
      ],
      companies: ["Codeship", "IBM", "Hulu"],
      summary: "The MEVN (MongoDB, Express.js, Vue.js, Node.js) stack is a modern full-stack JavaScript framework, comprising MongoDB for the database, Express.js for the backend framework, Vue.js for the frontend framework, and Node.js for the JavaScript runtime environment.",
      learn_link: "https://medium.com/@empiricinfotech/mevn-tech-stack-everything-you-need-to-know-4e6140731890"
    },
    {
      name: "React.js Stack",
      image_url: "https://aboutreact.com/wp-content/uploads/2018/07/reactjs.png",
      image2_url: "https://ih1.redbubble.net/image.1468562064.1834/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.jpg",
      type: "frontend",
      technologies: ["HTML", "CSS", "JavaScript", "React.js"],
      benefits: [
        "Component-based architecture for reusability",
        "Virtual DOM for efficient rendering",
        "Large ecosystem and strong community support",
      ],
      downsides: [
        "Steep learning curve for beginners",
        "Requires additional libraries for state management and routing",
      ],
      companies: ["Facebook", "Instagram", "WhatsApp"],
      summary: "The React.js frontend stack revolves around React, a JavaScript library for building user interfaces. It utilizes HTML, CSS, and JavaScript, with React.js as the core technology.",
      learn_link: "https://brainhub.eu/library/what-is-react"
    },
    {
      name: "Angular Stack",
      image_url: "https://logowik.com/content/uploads/images/angular9826.logowik.com.webp",
      image2_url: "https://img-c.udemycdn.com/course/750x422/3543810_90d3.jpg",
      type: "frontend",
      technologies: ["HTML", "CSS", "JavaScript", "Angular"],
      benefits: [
        "Two-way data binding for real-time updates",
        "Modular and reusable components",
        "Strong community support",
      ],
      downsides: [
        "Steep learning curve for beginners",
        "Less flexibility compared to newer frameworks like React",
      ],
      companies: ["Netflix", "Weather.com", "Freelancer"],
      summary: "The Angular frontend stack centers around Angular, a TypeScript-based framework for building web applications. It encompasses HTML, CSS, JavaScript/TypeScript, and Angular as the primary technologies.",
      learn_link: "https://angular.io/guide/what-is-angular"
    },
    {
      name: "Vue.js Stack",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAC79bvJql_1mXufFEe5rWQC_fHwUw48wukFQjyQdEg&s",
      image2_url: "https://ih1.redbubble.net/image.1468578427.2169/tst,large,507x507-pad,600x600,f8f8f8.webp",
      type: "frontend",
      technologies: ["HTML", "CSS", "JavaScript", "Vue.js"],
      benefits: [
        "Progressive framework for building user interfaces",
        "Simple integration with existing projects",
        "Lightweight and fast rendering",
      ],
      downsides: [
        "Smaller ecosystem compared to Angular and React",
        "Limited scalability for large projects",
      ],
      companies: ["Adobe", "GitLab", "Upwork"],
      summary: "The Vue.js frontend stack revolves around Vue.js, a progressive JavaScript framework for building user interfaces. It includes HTML, CSS, JavaScript, and Vue.js as the core technologies.",
      learn_link: "https://vuejs.org/guide/introduction.html"
    },
    {
      name: "Spring Boot Stack",
      image_url: "https://spring.io/img/og-spring.png",
      image2_url: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/279942988/original/eeffed4e29d80691e24def06f1cfdc2bef64cede/create-rest-api-spring-boot-and-spring-mvc-projects.png",
      type: "backend",
      technologies: ["Java", "Spring Boot", "Hibernate", "MySQL"],
      benefits: [
        "Fast development with convention over configuration",
        "Robust dependency injection and aspect-oriented programming",
        "Strong security features",
      ],
      downsides: [
        "Requires JVM, which can be resource-intensive",
        "Steep learning curve for beginners",
      ],
      companies: ["LinkedIn", "Netflix", "Alibaba"],
      summary: "The Spring Boot backend stack is built on Java and Spring Boot, providing a robust framework for developing enterprise-level applications. It leverages Java, Spring Boot, Hibernate, and MySQL as its core technologies.",
      learn_link: "https://spring.io/projects/spring-boot"
    },
    {
      name: "ASP.NET Stack",
      image_url: "https://softloomittraining.com/wp-content/uploads/2023/04/aspnet-benefits.png",
      image2_url: "https://www.aceinfoway.com/blog/wp-content/uploads/2020/05/top-5-benefits-of-using-aspnet-core.jpg",
      type: "backend",
      technologies: ["C#", "ASP.NET", "Entity Framework", "SQL Server"],
      benefits: [
        "Integrated development environment with Visual Studio",
        "Robust security features",
        "Scalable architecture for enterprise-level applications",
      ],
      downsides: [
        "Platform dependency on Windows",
        "Less flexibility compared to open-source alternatives",
      ],
      companies: ["Microsoft", "Stack Overflow", "GoDaddy"],
      summary: "The ASP.NET backend stack is a comprehensive framework for building robust web applications, developed by Microsoft. It utilizes C#, ASP.NET, Entity Framework, and SQL Server as its primary technologies.",
      learn_link: "https://dotnet.microsoft.com/en-us/apps/aspnet"
    },
    {
      name: "Node.js Stack",
      image_url: "https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.png",
      image2_url: "https://miro.medium.com/v2/resize:fit:600/0*_PPcWzOsiq8Imzff.jpg",
      type: "backend",
      technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB"],
      benefits: [
        "Highly scalable and asynchronous I/O handling",
        "Large ecosystem of libraries and frameworks",
        "Real-time web application development with WebSockets",
      ],
      downsides: [
        "Callback hell in complex applications",
        "Less suitable for CPU-bound tasks",
      ],
      companies: ["Netflix", "PayPal", "Uber"],
      summary: "The Node.js backend stack is a powerful JavaScript runtime environment for building scalable and efficient server-side applications. It utilizes JavaScript, Node.js, Express.js, and MongoDB as its core technologies.",
      learn_link: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
    },
  ],
};
