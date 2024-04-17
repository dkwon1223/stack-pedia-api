const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.set("port", process.env.PORT || 8080);
app.locals.title = "StackPedia API";

// GET HOME
app.get("/", (request, response) => {
  response.send("Welcome to StackPedia API");
});

app.get("/api/v1/technologies/all", (request, response) => {
  const programmingLanguages = app.locals.data.languages;
  const libraries = app.locals.data.libraries;
  const frameworks = app.locals.data.frameworks;
  const servers = app.locals.data.servers;
  const databases = app.locals.data.databases;
  const clouds = app.locals.data.clouds;

  const all = programmingLanguages
    .concat(libraries)
    .concat(frameworks)
    .concat(servers)
    .concat(databases)
    .concat(clouds);

  response.send(all);
});

app.get("/api/v1/technologies/:category", (request, response) => {
  const target = request.params.category;
  const category = app.locals.data[target];
  if (!category) {
    response.sendStatus(404);
  }
  response.send(category);
});

app.get("/api/v1/technologies/:category/:name", (request, response) => {
  const category = request.params.category;
  const name = request.params.name.toLowerCase();
  const targetTech = app.locals.data[category].find((tech) => {
    return tech.name.toLowerCase() === name;
  })
  if (!targetTech) {
    response.sendStatus(404);
  }
  response.send(targetTech);
});


app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});

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
      image2_url: "https://cdn.ourcodeworld.com/public-media/articles/articleocw-5c65fbda1ea05.jpg",
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
      use_cases: [
        "Single Page Applications",
        "UI Components",
        "Frontend Development",
      ],
      documentation_link: "https://reactjs.org/docs/getting-started.html",
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
      image_url: "https://assets-global.website-files.com/63f08f94fb9f06134f8c54eb/643f7baf66296a66bf2c1036_gin.png",
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
      compatibilities: [],
      date_created: "1995-04-01",
      image_url:
        "https://www.apache.org/foundation/press/kit/asf_logo.png",
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
      compatibilities: [],
      date_created: "2004-10-04",
      image_url:
        "https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png",
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
      compatibilities: [],
      date_created: "1995-12-06",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vbOxSEhHPxjz4z3CrgzDUfXcx-wK4vGC-bP-OCUA1A&s",
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
      compatibilities: [],
      date_created: "2013-03-20",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1920px-Docker_%28container_engine%29_logo.svg.png",
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
      compatibilities: [],
      date_created: "2014-06-07",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kubernetes_logo.svg/1920px-Kubernetes_logo.svg.png",
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
      compatibilities: [],
      date_created: "1999-12-14",
      image_url:
        "https://webhostinggeeks.com/blog/wp-content/uploads/2023/05/Apache-Tomcat-Web-Server.png",
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
      use_cases: ["Cloud Computing", "Data Storage", "Machine Learning"],
      documentation_link: "https://cloud.google.com/docs",
      summary:
        "Google Cloud Platform (GCP) is a suite of cloud computing services provided by Google. It offers a wide range of services including computing, storage, databases, machine learning, and networking, enabling users to build and deploy applications on Google's infrastructure.",
    },
  ],
};
