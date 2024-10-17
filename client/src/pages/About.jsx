import React from "react";

const About = () => {
  return (
    <div className="bg-lightGray py-10 px-5">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Our Online Training Platform</h1>
        <p className="mb-4">
          Welcome to our online training platform, your gateway to acquiring new skills and knowledge from the comfort of your home. We offer a variety of courses that cater to different interests and professional needs.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          Our mission is to provide accessible, high-quality education that empowers individuals to enhance their skills, advance their careers, and achieve their personal development goals.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Course Categories</h2>
        <ul className="list-disc ml-5 mb-4">
          <li>Software Development</li>
          <li>Coding Languages</li>
          <li>Design Training</li>
          <li>Personal Development Training</li>
        </ul>
        <p className="mb-4">
          Each of these categories encompasses a range of courses designed to meet the needs of beginners and advanced learners alike. Our courses are structured to ensure that you have a clear path to success.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Course Features</h2>
        <ul className="list-disc ml-5 mb-4">
          <li>Self-Paced Learning: Learn at your own pace with flexible scheduling.</li>
          <li>Expert Trainers: Choose from a selection of experienced trainers to guide you through your course.</li>
          <li>Interactive Modules: Each course consists of multiple modules, each covering different aspects of the subject.</li>
          <li>One-on-One Sessions: Have your doubts addressed directly with trainers through personal sessions.</li>
          <li>Course Duration: Courses are designed to be completed in under 200 hours, making it manageable for anyone.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          1. **Select a Course**: Browse our categories and select a course that aligns with your interests and career goals.
        </p>
        <p className="mb-4">
          2. **Choose a Trainer**: Once you've selected a course, you can choose a trainer based on their expertise and your learning style.
        </p>
        <p className="mb-4">
          3. **Complete Modules**: Engage with the course content through various modules and practical exercises.
        </p>
        <p className="mb-4">
          4. **Get Support**: Whenever you have questions, schedule a one-on-one session with your trainer for personalized support.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Join Us Today!</h2>
        <p>
          Start your journey of self-improvement and skill development with us today! Sign up now and take the first step toward achieving your goals.
        </p>
      </div>
    </div>
  );
};

export default About;
