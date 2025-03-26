import shell from "shelljs";

// Ensure the public directory exists in dist
shell.mkdir("-p", "dist/public");

// Copy contents of public folder to dist/public
shell.cp("-R", "public/*", "dist/public/");
