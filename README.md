<h1>WriteBlog</h1>
WriteBlog is a simple and responsive blogging platform that allows users to create, edit, and publish blog posts. Built using HTML, CSS, JavaScript, Express.js, MySQL, and EJS, it follows REST API principles to ensure structured and scalable backend operations. <hr>
<p>Check it: <a href="https://www.linkedin.com/posts/sonushavik_writeblog-restapi-webdevelopment-activity-7308717884099223552-fgDB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZ6PfsBb-8jW85Vemv30J-dtmrMOoqaG14">Demo</a></p>
<h2>Features</h2>
<ul>
<li><b>📝 Create & Edit Blogs:</b> Users can write and edit blog posts dynamically.</li>

<li><b>🎨 Responsive Design:</b> Fully optimized for mobile and desktop users.</li>

<li><b>🚀 Fast Performance:</b> Built using Express.js for efficient backend operations.</li>

<li><b>🗄️ MySQL Database:</b> Blogs are stored securely in a MySQL database.</li>

<li><b>🎭 EJS Templating:</b> Dynamic page rendering using Embedded JavaScript (EJS).</li>

<li><b>🌍 RESTful API:</b> Well-structured API endpoints for CRUD operations.</li>

</ul>

<h2>Technologies Used</h2>
<ul>
  <li><b>Frontend:</b> HTML, CSS, JavaScript</li>
  <li><b>Backend:</b> Express.js</li>
  <li><b>Templating Engine:</b> EJS</li>
  <li><b>Database:</b> MySQL</li>
</ul>

<h2>REST API Endpoints</h2>
The backend follows RESTful principles and provides the following API endpoints:
<h3>Blog Routes:</h2>
<li><b>GET / -</b>get home page</li>

<li><b>GET /posts -</b>Fetch all blog posts</li>
  
<li><b>GET /posts/:id -</b>Fetch a single blog post by ID</li>

<li><b>POST /posts/new -</b>Create a new blog post</li>

<li><b>PATCH /posts/:id -</b>Update an existing blog post</li>

<li><b>DELETE /posts/:id -</b>Delete a blog post</li>

<h2>Installation</h2>
<h3>1.Clone the repository:</h3>
git clone https://github.com/yourusername/writeblog.git<br>
cd writeBlog-REST<br>
<h3>2.Install dependencies:</h3>
<a>npm install</a>

<h3>3.Set up MySQL database:</h3>

<li>Create a database named write_blog</li>

<li>Import the SQL file provided in the repository</li>

<li>Update database credentials in .env file</li>
<br>

<h3>4.Run the server:</h3>
node server.js
<h3>Open Browser:</h3>
Navigate to http://localhost:8080
