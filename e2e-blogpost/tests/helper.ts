const loginWith = async (page, username, password) => {
  await page.getByRole("textbox", { name: "username" }).fill(username);
  await page.getByRole("textbox", { name: "password" }).fill(password);
  await page.getByTestId("submitBtn").click();
};

const createBlog = async (page, title, author, url, likes) => {
  await page.getByTestId("newBlog").click();
  await page.fill('input[name="title"]', title);
  await page.fill('input[name="author"]', author);
  await page.fill('input[name="url"]', url);
  await page.fill('input[name="likes"]', likes);
  await page.getByTestId("newFormBtn").click();
};

export { loginWith, createBlog };
