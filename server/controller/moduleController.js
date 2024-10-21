
const CourseModule = require("../model/courseModuleModel");

const getModule=async(req,res)=>{
  try {
      const module=await CourseModule.find().populate("category")
      res.status(200).json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addModule=async(req,res)=>{
    try {
     const { name,description,moduleNumber,moduleDuration,moduleContent,category } = req.body; 
      
    const existingModule = await CourseModule.findOne({ name });
    if (existingModule) {
      return res.status(400).json({ message: "Module already exists" });
    }
  //   const dummyModules = [
  //     {
  //         category: "670bed292c1eb0dc85e3ca24", // Software Development
  //         name: "Introduction to Software Development",
  //         description: "This module provides a comprehensive introduction to software development. It covers essential concepts including different development methodologies, tools commonly used in the industry, and best practices that can help ensure successful project completion.",
  //         moduleNumber: 1,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "Overview", duration: 15 },
  //             { name: "Methodologies", duration: 45 }
  //         ]
  //     },
  //     {
  //         category: "670bed292c1eb0dc85e3ca24", // Software Development
  //         name: "Agile Methodologies",
  //         description: "This module focuses on Agile methodologies, emphasizing the principles and practices that guide Agile software development. Students will learn about various frameworks such as Scrum and Kanban, and how to apply them effectively in real-world scenarios.",
  //         moduleNumber: 2,
  //         moduleDuration: 90,
  //         moduleContent: [
  //             { name: "Scrum Framework", duration: 30 },
  //             { name: "Kanban", duration: 30 },
  //             { name: "Agile Estimation", duration: 30 }
  //         ]
  //     },
  //     {
  //         category: "670bed292c1eb0dc85e3ca24", // Software Development
  //         name: "Version Control with Git",
  //         description: "In this module, learners will understand the importance of version control systems, particularly Git. The course covers basic commands, branching, merging, and collaboration strategies that enable teams to work together effectively on software projects.",
  //         moduleNumber: 3,
  //         moduleDuration: 45,
  //         moduleContent: [
  //             { name: "Git Basics", duration: 15 },
  //             { name: "Branching and Merging", duration: 30 }
  //         ]
  //     },
  //     {
  //         category: "670bed292c1eb0dc85e3ca24", // Software Development
  //         name: "Software Testing",
  //         description: "This module delves into software testing methodologies, highlighting their significance in the software development lifecycle. Students will explore different types of testing, including unit testing, integration testing, and the tools used to automate these processes.",
  //         moduleNumber: 4,
  //         moduleDuration: 75,
  //         moduleContent: [
  //             { name: "Unit Testing", duration: 30 },
  //             { name: "Integration Testing", duration: 30 },
  //             { name: "Test Automation", duration: 15 }
  //         ]
  //     },
  //     {
  //         category: "670bed622c1eb0dc85e3ca28", // Full Stack Development
  //         name: "Frontend Development Basics",
  //         description: "This module introduces students to frontend web development, focusing on HTML, CSS, and JavaScript. Learners will gain practical experience in building responsive and visually appealing web applications, while understanding the core concepts of user interface design.",
  //         moduleNumber: 1,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "HTML Basics", duration: 20 },
  //             { name: "CSS Basics", duration: 20 },
  //             { name: "JavaScript Basics", duration: 20 }
  //         ]
  //     },
  //     {
  //         category: "670bed622c1eb0dc85e3ca28", // Full Stack Development
  //         name: "Backend Development Basics",
  //         description: "This module covers the fundamentals of backend development, focusing on server-side programming with Node.js and Express.js. Students will learn how to create RESTful APIs and manage databases, enabling them to build full-stack applications.",
  //         moduleNumber: 2,
  //         moduleDuration: 75,
  //         moduleContent: [
  //             { name: "Node.js Introduction", duration: 30 },
  //             { name: "Express.js Basics", duration: 30 },
  //             { name: "Database Interaction", duration: 15 }
  //         ]
  //     },
  //     {
  //         category: "670bed622c1eb0dc85e3ca28", // Full Stack Development
  //         name: "API Development",
  //         description: "This module provides in-depth knowledge on API development, teaching students how to design, implement, and secure APIs. It covers the best practices for creating robust and scalable APIs, as well as tools for testing and documenting them.",
  //         moduleNumber: 3,
  //         moduleDuration: 90,
  //         moduleContent: [
  //             { name: "RESTful APIs", duration: 30 },
  //             { name: "API Authentication", duration: 30 },
  //             { name: "API Documentation", duration: 30 }
  //         ]
  //     },
  //     {
  //         category: "670bed622c1eb0dc85e3ca28", // Full Stack Development
  //         name: "Deployment Strategies",
  //         description: "This module explores various deployment strategies for web applications, focusing on both traditional and cloud-based environments. Students will learn about Continuous Integration and Continuous Deployment (CI/CD) practices to streamline their deployment processes.",
  //         moduleNumber: 4,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "Cloud Deployment", duration: 20 },
  //             { name: "Containerization with Docker", duration: 20 },
  //             { name: "CI/CD Practices", duration: 20 }
  //         ]
  //     },
  //     {
  //         category: "670bed6f2c1eb0dc85e3ca2c", // Design Courses
  //         name: "Introduction to Graphic Design",
  //         description: "This module introduces the fundamental principles of graphic design, covering topics such as composition, color theory, and typography. Students will learn how to apply these concepts to create effective visual communication.",
  //         moduleNumber: 1,
  //         moduleDuration: 45,
  //         moduleContent: [
  //             { name: "Design Principles", duration: 15 },
  //             { name: "Color Theory", duration: 15 },
  //             { name: "Typography Basics", duration: 15 }
  //         ]
  //     },
  //     {
  //         category: "670bed6f2c1eb0dc85e3ca2c", // Design Courses
  //         name: "User Experience Design",
  //         description: "This module covers the essential concepts of User Experience (UX) design. Students will learn how to conduct user research, create wireframes, and develop prototypes, all aimed at improving the usability of digital products.",
  //         moduleNumber: 2,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "User Research", duration: 20 },
  //             { name: "Wireframing", duration: 20 },
  //             { name: "Prototyping", duration: 20 }
  //         ]
  //     },
  //     {
  //         category: "670bed6f2c1eb0dc85e3ca2c", // Design Courses
  //         name: "Web Design Basics",
  //         description: "In this module, students will learn the foundational principles of web design. Topics include creating responsive layouts, designing for accessibility, and utilizing web design tools to enhance productivity and creativity.",
  //         moduleNumber: 3,
  //         moduleDuration: 75,
  //         moduleContent: [
  //             { name: "Responsive Design", duration: 25 },
  //             { name: "Designing for Accessibility", duration: 25 },
  //             { name: "Web Design Tools", duration: 25 }
  //         ]
  //     },
  //     {
  //         category: "670bed6f2c1eb0dc85e3ca2c", // Design Courses
  //         name: "Branding Essentials",
  //         description: "This module provides an overview of branding principles, emphasizing the importance of a strong brand identity. Students will learn about logo design, brand strategy, and how to create cohesive visual identities.",
  //         moduleNumber: 4,
  //         moduleDuration: 30,
  //         moduleContent: [
  //             { name: "Brand Identity", duration: 15 },
  //             { name: "Logo Design", duration: 15 }
  //         ]
  //     },
  //     {
  //         category: "670cbecd918797775651e8b6", // Coding Language
  //         name: "Python Basics",
  //         description: "This module serves as an introduction to Python programming. Students will learn about basic syntax, data types, control structures, and functions, along with hands-on exercises to reinforce their learning.",
  //         moduleNumber: 1,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "Python Syntax", duration: 20 },
  //             { name: "Data Types and Variables", duration: 20 },
  //             { name: "Control Flow", duration: 20 }
  //         ]
  //     },
  //     {
  //         category: "670cbecd918797775651e8b6", // Coding Language
  //         name: "JavaScript Fundamentals",
  //         description: "This module covers the foundational concepts of JavaScript programming. Learners will explore variables, functions, and DOM manipulation, and apply their skills to build interactive web applications.",
  //         moduleNumber: 2,
  //         moduleDuration: 75,
  //         moduleContent: [
  //             { name: "Variables and Functions", duration: 25 },
  //             { name: "DOM Manipulation", duration: 25 },
  //             { name: "Event Handling", duration: 25 }
  //         ]
  //     },
  //     {
  //         category: "670cbecd918797775651e8b6", // Coding Language
  //         name: "Java for Beginners",
  //         description: "In this module, students will be introduced to the Java programming language. Topics include Java syntax, object-oriented programming concepts, and exception handling, with practical exercises to develop programming skills.",
  //         moduleNumber: 3,
  //         moduleDuration: 90,
  //         moduleContent: [
  //             { name: "Java Syntax", duration: 30 },
  //             { name: "Object-Oriented Programming", duration: 30 },
  //             { name: "Exception Handling", duration: 30 }
  //         ]
  //     },
  //     {
  //         category: "670cbecd918797775651e8b6", // Coding Language
  //         name: "C++ Basics",
  //         description: "This module provides a foundational understanding of C++ programming. Students will learn about syntax, pointers, references, and classes, along with practical examples to enhance their learning experience.",
  //         moduleNumber: 4,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "C++ Syntax", duration: 20 },
  //             { name: "Pointers and References", duration: 20 },
  //             { name: "Classes and Objects", duration: 20 }
  //         ]
  //     },
  //     {
  //         category: "6715cf3547a399c8f52460d2", // Cloud Computing
  //         name: "Introduction to Cloud Computing",
  //         description: "This module introduces the key concepts of cloud computing, covering various cloud service models, deployment models, and the advantages of adopting cloud technologies in modern businesses. Students will explore real-world applications and case studies.",
  //         moduleNumber: 1,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "Cloud Service Models", duration: 20 },
  //             { name: "Deployment Models", duration: 20 },
  //             { name: "Benefits of Cloud Computing", duration: 20 }
  //         ]
  //     },
  //     {
  //         category: "6715cf3547a399c8f52460d2", // Cloud Computing
  //         name: "AWS Basics",
  //         description: "In this module, students will gain foundational knowledge of Amazon Web Services (AWS). Topics include AWS architecture, core services such as EC2 and S3, and practical tips for managing cloud resources effectively.",
  //         moduleNumber: 2,
  //         moduleDuration: 75,
  //         moduleContent: [
  //             { name: "AWS Overview", duration: 25 },
  //             { name: "EC2 Instances", duration: 25 },
  //             { name: "S3 Storage", duration: 25 }
  //         ]
  //     },
  //     {
  //         category: "6715cf3547a399c8f52460d2", // Cloud Computing
  //         name: "Microsoft Azure Fundamentals",
  //         description: "This module introduces students to the Microsoft Azure platform. Learners will explore key Azure services, storage options, and security features that are essential for building and managing applications in the cloud.",
  //         moduleNumber: 3,
  //         moduleDuration: 90,
  //         moduleContent: [
  //             { name: "Azure Services", duration: 30 },
  //             { name: "Azure Storage", duration: 30 },
  //             { name: "Azure Security", duration: 30 }
  //         ]
  //     },
  //     {
  //         category: "6715cf3547a399c8f52460d2", // Cloud Computing
  //         name: "Google Cloud Platform Basics",
  //         description: "This module provides an introduction to Google Cloud Platform (GCP). Students will learn about GCP's architecture, various services offered, and how to utilize them for building scalable applications in a cloud environment.",
  //         moduleNumber: 4,
  //         moduleDuration: 60,
  //         moduleContent: [
  //             { name: "GCP Overview", duration: 20 },
  //             { name: "GCP Storage Options", duration: 20 },
  //             { name: "GCP Security Features", duration: 20 }
  //         ]
  //     }
  // ];
  // dummyModules.map(async(ele)=>{
  //   const name=ele.name
  //   const description=ele.description
  //   const moduleNumber=ele.moduleNumber
  //   const moduleContent=ele.moduleContent
  //   const category=ele.category
    
  const newModule = new CourseModule({ name,description,moduleNumber,moduleDuration,moduleContent,category });
    await newModule.save();
  // })

    res.status(201).json(newModule);
    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }
  }

    const deleteCourseModule=async(req,res)=>{
      try {
       
        const id=req.params.id
        const deletedModule=await CourseModule.findByIdAndDelete(id)
        if (!deletedModule) {
          return res.status(404).json({ message: "Module not found" });
        }
        return res.status(200).json({message:"Module Deleted Successfully"})
      } catch (error) {
        res.status(500).json({error:error.message})
      }
    }


module.exports={getModule,addModule,deleteCourseModule}